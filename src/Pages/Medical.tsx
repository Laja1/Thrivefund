import FundCard from "@/Components/FundCard"
import {motion} from 'framer-motion'
const data=[
    {
"id":1,
"title":"Help Muhammad and his family in ojota",
"goal":20000,
"image":"https://images.unsplash.com/photo-1620767463583-14661a8b63eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2F6YXxlbnwwfHwwfHx8MA%3D%3D",
"donations":200,
"amountRaised":2000
    },
       {
"id":2,
"title":"Help Muhammad and his family in ojota",
"goal":20000,
"image":"https://images.unsplash.com/photo-1620767463583-14661a8b63eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2F6YXxlbnwwfHwwfHx8MA%3D%3D",
"donations":200,
"amountRaised":2000
    },
       {
"id":3,
"title":"Help Muhammad and his family in ojota",
"goal":20000,
"image":"https://images.unsplash.com/photo-1620767463583-14661a8b63eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2F6YXxlbnwwfHwwfHx8MA%3D%3D",
"donations":200,
"amountRaised":2000
    },
       {
"id":4,
"title":"Help Muhammad and his family in ojota",
"goal":20000,
"image":"https://images.unsplash.com/photo-1620767463583-14661a8b63eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2F6YXxlbnwwfHwwfHx8MA%3D%3D",
"donations":200,
"amountRaised":2000
    },
       {
"id":5,
"title":"Help Muhammad and his family in ojota",
"goal":20000,
"image":"https://images.unsplash.com/photo-1620767463583-14661a8b63eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2F6YXxlbnwwfHwwfHx8MA%3D%3D",
"donations":200,
"amountRaised":2000
    },
       {
"id":1,
"title":"Help Muhammad and his family in ojota",
"goal":20000,
"image":"https://images.unsplash.com/photo-1620767463583-14661a8b63eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2F6YXxlbnwwfHwwfHx8MA%3D%3D",
"donations":200,
"amountRaised":2000
    },
]
export default function Medical() {
  return (
   <div className="min-h-screen flex bg-[#F7FAFC]  flex-col container mx-auto w-full items-center justify-center pt-10">
      <h1 className="text-3xl font-bold">Medical Cases</h1>
         <motion.div className="flex-row items-center justify-center pb-10 pt-3 flex flex-wrap gap-3" initial={{opacity:0.5, y:60}} animate={{opacity:1,y:0}} transition={{duration:1,}}>
    {data.map((item) => 
    <FundCard width='40%' goal={item.goal} amountRaised={item.amountRaised} key={item.id} image={item.image} title={item.title} donations={item.donations}/>
  )}    
      </motion.div>
    </div>
  )
}
