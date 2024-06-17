import Button from "./Button"

type CardProps = {
    image: string,
    campaignName: string,
    
    text: string,
    link:string
}

export default function Card({image,campaignName,text,link}:CardProps) {
  return (
    <div className="w-[300px] border-[1px] shadow-xl  border-[#fdfdf] flex flex-col rounded-md">
          <img src={image} className="rounded-t-md"/>
          <div className="px-5  flex flex-col">
              <div className="flex-row flex justify-center pt-3"> <p className="font-bold loraa">{campaignName}</p> </div>
              <p className="text-sm leading-loose  lora py-3">{text}</p>
             <div className=" flex pb-5 justify-center"> <Button px="50px" py="12px" text="Donate Now" to={link}/></div>
          </div>
    </div>
  )
}
