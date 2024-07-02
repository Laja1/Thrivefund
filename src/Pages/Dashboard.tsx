// import useFetch from "@/customHook/useFetch"

export default function Dashboard() {
    // const {data,isLoading,isError}=useFetch()
  return (
    <div className="h-screen w-full">
          <div className="flex-row flex">
              <h1>Dashboard</h1>
          </div>
          <div className="flex-row items-center justify-center flex"><div className="basis-1/4 flex">
              John Doe
          </div>
          <div className="basis-1/2 flex bg-black">
              sheep   
          </div></div>
    </div>
  )
}
