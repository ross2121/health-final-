import HospitalForm  from "@/components/example/mapmain";
import { cookies } from 'next/headers'
 
async function getCookieData() {
  const cookieData = cookies().getAll()
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData)
    }, 1000)
  )
}
const Page=async()=>{
    const cookieData = await getCookieData()
    console.log(cookieData);
  return(
    <HospitalForm>

    </HospitalForm>
  )
}
export default Page