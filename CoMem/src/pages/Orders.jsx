import OrdersTable from "../components/OrdersTable"
import UserMenu from "../components/User/UserMenu"


const Orders=()=>{
    return (
        <div>
      
        <div className="h-[500px] flex items-center justify-start px-6">
          <div className="ml-40">
            <UserMenu />
          </div>
          <div className="ml-20">
            <OrdersTable/>
          </div>
        </div>
        
      </div>
    )
}

export default Orders