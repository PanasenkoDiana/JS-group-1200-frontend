import { useForm } from 'react-hook-form';

type LoginFormType = {
    email: string,
    password: string
}
export function LoginForm(){
    const {register, handleSubmit,
        // formState - зберігає інформацію про стан форм
        // isValid - показує чи прошли всі поля перевірку
        // isDirty - показую чи було поле якось змінено
        formState:{errors, isValid, isDirty}
    // () всередині вказуємо обь'ект з налаштуваннями форм
    } = useForm<LoginFormType>({
        // mode - це параметр який відповідає в який момент будуть перевірятися введені данні
        mode: 'onChange',
        // defaultValues - задає стандартні значення для полей
        defaultValues: {
            email: "",
            password: ""
        } 
    })
    
    function onSubmit(data: LoginFormType){
        console.log("text")
    }
    return (
        // noValidate - атрибут форми який вимикає звичайну перевірку браузера
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>
            <input type= "email" placeholder= "email" {...register("email", {
                required:"vayidite email",
                maxLength: {
                    value: 254,
                    message: "slishkom mnogo"
                },
                pattern: {
                    //регулярний вираз якому повивен відповідати введений імейл
                    value: /^\S+@\S+\.\S+$/,
                    message: "email govno"
                }
            })}/>
            {errors.email&&(
                <h5>{errors.email.message}</h5>
            )}
            <input type= "password" placeholder= "password" {...register("password",{
                required: "password choto"
            })}/>
            {errors.password&&(
                <h4>{errors.password.message}</h4>
            )}
            {!isDirty?"zapolnit formu": isValid?"vse good": "vse ploho"}
            <button type= "submit">Submit</button>
        </form>

    )
}