import { Header } from './components/Header'
import './App.css'
import { ProductList } from './components/ProductList'
import { useGetProductsQuery } from './api/baseApi'

function App() {
  const{data: products = [], isLoading, isError} = useGetProductsQuery()
  return(
    <main>
      <Header title='product Catalog' description='НАШ ПЕРШИЙ REACT ПРОЕКТ + TYPE SCRIPT'/>
      {isLoading && <p>Завантаження товарів...</p>} 
      {isError && <p>Не вдалося завантажити товари</p>}
      {!isLoading && !isError && (products.length > 0
                                  ?<ProductList products={products}/>
                                  :<p>Товарів не знайденно</p>)}
    </main>
  )
}


export default App
