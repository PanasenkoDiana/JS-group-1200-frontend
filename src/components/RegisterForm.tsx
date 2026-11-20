
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../api/baseApi';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type RegisterValues = {
    email: string;
    password: string;
};

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<RegisterValues>({ mode: "onChange" });

    const [registerUser, { isLoading, isSuccess }] = useRegisterMutation();

    async function onSubmit(data: RegisterValues) {
        try {
            await registerUser(data).unwrap();
            reset();
        } catch (error) {
            const apiError = error as FetchBaseQueryError;
            let message = "Не вдалося зареєструватися";

            if (apiError.status === 409) {
                message = "Користувач із таким email вже існує";
            } else if (
                apiError.status === "FETCH_ERROR" ||
                apiError.status === "TIMEOUT_ERROR"
            ) {
                message = "Не вдалося з'єднатися із сервером";
            } else if (
                typeof apiError.status === "number" &&
                apiError.status >= 500
            ) {
                message = "Помилка сервера. Спробуйте пізніше";
            }

            setError("root", { message });
        }
    }

    return (
        <form
            className="register-form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2>Реєстрація</h2>

            <input
                type="email"
                placeholder="Email"
                {...register("email", {
                    required: "Введіть email",
                    maxLength: {
                        value: 254,
                        message: "Email занадто довгий",
                    },
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Некоректний формат email",
                    },
                })}
            />

            {errors.email && (
                <p className="form-error">{errors.email.message}</p>
            )}

            <input
                type="password"
                placeholder="Пароль"
                {...register("password", {
                    required: "Введіть пароль",
                    minLength: {
                        value: 8,
                        message: "Мінімум 8 символів",
                    },
                    maxLength: {
                        value: 128,
                        message: "Максимум 128 символів",
                    },
                })}
            />

            {errors.password && (
                <p className="form-error">{errors.password.message}</p>
            )}

            {errors.root && (
                <p className="form-error">{errors.root.message}</p>
            )}

            {isSuccess && (
                <p>Реєстрацію завершено. Тепер можна увійти.</p>
            )}

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Реєстрація..." : "Зареєструватися"}
            </button>
        </form>
    );
}
