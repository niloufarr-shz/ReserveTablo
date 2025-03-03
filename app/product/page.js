import Tablo from "../../components/data/Tablo"
import Card from "../../components/mediacard/Card"
function page() {
  return (
    <div className="mt-16">
    <Card myfilter={Tablo}/>
    </div>
  )
}

export default page