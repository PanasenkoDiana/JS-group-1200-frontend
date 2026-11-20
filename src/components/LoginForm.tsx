import { useForm } from "react-hook-form";
import { useLoginMutation } from "../api/baseApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type LoginValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,

    // formState содержит информацию о текущем состоянии формы.
    formState: {errors, isValid, isDirty}
    // В круглых скобках () указывается объект с настройками формы.
  } = useForm<LoginValues>({
    mode: "onChange",

    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loginUser, {isLoading}] = useLoginMutation();

  async function onSubmit(data: LoginValues) {
    try {
        await loginUser(data).unwrap();
        console.log("Успешная авторизация!");

    } catch (error) {
    // Приводим полученную ошибку к типу FetchBaseQueryError.
    // Это нужно TypeScript, чтобы мы могли обращаться к свойству status
    // и проверять, какая именно ошибка произошла.
    const apiError = error as FetchBaseQueryError;

    // Создаём сообщение по умолчанию.
    // Оно будет показано, если мы не найдём более конкретную причину ошибки.
    let message = "Не вдалося увійти. Спробуйте ще раз.";

    // Проверяем статус ошибки, который вернул RTK Query.

    // 401 — Unauthorized.
    // Сервер сообщает, что пользователь не прошёл авторизацию.
    // Например, email или пароль введены неправильно.
    if (apiError.status === 401) {
        message = "Неправильний email або пароль";

    // FETCH_ERROR — ошибка при выполнении сетевого запроса.
    // Например, сервер выключен, недоступен или отсутствует интернет.
    // TIMEOUT_ERROR — сервер не ответил за отведённое время.
    } else if (
        apiError.status === "FETCH_ERROR" ||
        apiError.status === "TIMEOUT_ERROR"
    ) {
        message = "Не вдалося з'єднатися із сервером";

    // Проверяем, является ли статус числом и не меньше ли он 500.
    // Коды 500–599 обычно означают внутренние ошибки сервера.
    // Например, сервер столкнулся с ошибкой при обработке запроса.
    } else if (
        typeof apiError.status === "number" &&
        apiError.status >= 500
    ) {
        message = "Помилка сервера. Спробуйте пізніше";
    }

    // Передаём сообщение об ошибке в React Hook Form.
    // "root" означает, что ошибка относится ко всей форме,
    // а не к конкретному полю email или password.
    // message — текст, который мы хотим показать пользователю.
    setError("root", { message });
    }

  }

  // Возвращаем HTML-разметку нашей формы.
  return (
    // noValidate отключает стандартную браузерную проверку HTML.
    // Это нужно, чтобы проверкой данных занимался react-hook-form.
    // noValidate внутри тега <form> называется HTML-атрибутом.
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <h2>Вхід</h2>

      <input
        type="email"
        placeholder="Email"

        // register связывает это поле с react-hook-form.
        // Первым аргументом передаём название поля — email.
        // Вторым аргументом указываем правила проверки.
        {...register("email", {
          required: "Введіть email",

          // maxLength ограничивает максимальное количество символов.
          // value: 254 — максимальная длина Email.
          // message — текст ошибки, если ограничение нарушено.
          maxLength: {
            value: 254,
            message: "Email занадто довгий",
          },

          // pattern проверяет, соответствует ли текст определённому шаблону.
          // Здесь мы используем регулярное выражение для проверки Email.
          pattern: {
            // /	Начало регулярного выражения	Показывает JavaScript, что дальше записан шаблон для проверки текста.
            // ^	Начало строки	Проверка начинается строго с первого символа текста.
            // \S	Любой непробельный символ	Любой символ, кроме пробела, табуляции и переноса строки.
            
            // +	Квантификатор	Означает, что предыдущий символ или шаблон должен встретиться один или несколько раз.
            //Символ + означает «один или больше», а * означает «ноль или больше».

            // @	Символ собаки	Требует наличия символа @.
            // \S+	Последовательность символов	Требует один или несколько непробельных символов после @.
            // \.	Экранированная точка	Требует именно точку ..
            // \S+	Последовательность символов	Требует один или несколько непробельных символов после точки.
            // $	Конец строки	Проверка должна закончиться на последнем символе текста.
            // /	Конец регулярного выражения	Показывает, что шаблон завершён.
            value: /^\S+@\S+\.\S+$/,

            // Сообщение, которое появится, если Email неправильный.
            message: "Некоректний email",
          },

        })}
      />

      {/* Проверяем, есть ли ошибка у поля Email */}
      {errors.email && (

        // Если ошибка существует, показываем её текст.
        <p className="form-error">{errors.email.message}</p>

      )}

      {/* Поле для ввода пароля */}
      <input
        type="password"
        placeholder="Пароль"

        {...register("password", {
          required: "Введіть пароль",

        })}
      />

      {errors.password && (
        <p className="form-error">{errors.password.message}</p>

      )}

      <p>
        {
          // Если пользователь ещё ничего не вводил,
          // предлагаем ему заполнить форму.
          !isDirty
            ? "Заповніть форму"
            // Если пользователь что-то ввёл и все поля прошли проверку,
            // сообщаем, что данные правильные.
            : isValid
              ? "Поля пройшли перевірку"
              // Если данные введены, но проверку не прошли,
              // предлагаем проверить их.
              : "Перевірте дані"
        }

      </p>
      {errors.root && (
        <p className="form-error">{errors.root.message}</p>
      )}

      {/* Кнопка отправки формы */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Виконується вхід..." : "Увійти"}
      </button>

    </form>
  );
}