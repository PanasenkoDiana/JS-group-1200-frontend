import { Header } from './components/Header'
import { RegisterForm } from './components/RegisterForm'
import './App.css'
import { ProductList } from './components/ProductList'
import { useGetMeQuery, useGetProductsQuery } from './api/baseApi'
import { LoginForm } from './components/LoginForm'

function App() {
  const{data: products = [], isLoading, isError} = useGetProductsQuery()
  const {data: user, isLoading: isUserLoading, isError: isUserError} = useGetMeQuery()
  return(
    <main>
      <Header title='product Catalog' description='НАШ ПЕРШИЙ REACT ПРОЕКТ + TYPE SCRIPT'/>
       {isUserLoading && <p>Перевірка авторизації...</p>}
       {isUserLoading ? (
          <p>Перевіряємо авторизацію...</p>
        ) : user ? (
          <p>Ви авторизовані як {user.email}</p>
        ) : (
          <>
            <RegisterForm />
            <LoginForm />
          </>
        )}
      {isUserError && (
        <p>Не вдалося перевірити авторизацію</p>
      )}
      {isLoading && <p>Завантаження товарів...</p>} 
      {isError && <p>Не вдалося завантажити товари</p>}
      {!isLoading && !isError && (products.length > 0
                                  ?<ProductList products={products}/>
                                  :<p>Товарів не знайденно</p>)}
    </main>
  )
}


export default App
