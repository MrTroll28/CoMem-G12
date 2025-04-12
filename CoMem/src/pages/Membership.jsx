import MembershipCard from "../components/MembershipCart"
import UserMenu from "../components/User/UserMenu"

const Membership=()=>{

    return(
        <div>
      
        <div className="h-[500px] flex items-center justify-start px-6">
          <div className="ml-40">
            <UserMenu />
          </div>
          <div className="ml-20">
           <MembershipCard/>
          </div>
        </div>
        
      </div>
    )
}

export default Membership