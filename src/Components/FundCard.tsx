
type CardProps = {
    image: string,
    title: string,
    donations: number,
    goal:number,
    amountRaised: number,
    width:number
}

export default function FundCard({image,width,title,goal,donations,amountRaised,}:CardProps) {
  return (
    <div className="w-[300px] border-[1px] shadow-xl  border-[#fdfdf] flex flex-col rounded-md">
          <img src={image} className="rounded-t-md"/>
          <div className="px-5  flex flex-col">
              <div className="flex-col  flex gap-2 items-center"> 
              <p className="font-bold lora text-center">{title}</p> 
              
<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${width}%` }}></div>
</div>

              <p className="text-blue-400 lora">{donations} donations</p></div>
              <div className="text-sm items-center justify-center gap-1 flex py-5">
                <p className="font-bold lora">₦{amountRaised}</p> <p className="lora">raised of</p> <span className="font-bold lora">₦{goal}</span> <p className="lora">goal</p></div>
            
          </div>
    </div>
  )
}
