export function BadSite() {
  return (
    <div className="flex h-full flex-col bg-gray-100 font-sans">
      <div className="flex h-8 items-center border-b border-gray-200 bg-white px-3 text-[8px] text-gray-500">
        Home | About | Services | Contact | Blog | FAQ
      </div>
      <div className="bg-gray-50 p-4 text-center">
        <p className="text-[13px] font-bold text-gray-700">Welcome To Our Website</p>
        <p className="mt-1 text-[8px] text-gray-400">We provide solutions for your business needs.</p>
        <span className="mt-2 inline-block bg-blue-500 px-3 py-1 text-[8px] text-white">Click Here</span>
        <div className="mt-3 space-y-1">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
        </div>
      </div>
      <div className="mt-auto flex h-6 items-center justify-center bg-gray-200 text-[7px] text-gray-400">
        © 2019 Our Company. All Rights Reserved.
      </div>
    </div>
  )
}
