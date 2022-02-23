import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import twitterLogo from '../public/twitterBrand.jpg'
import twitter from '../public/twitter.png'
import { getProviders, signIn } from "next-auth/react"


interface Props {
  providers:any
}

const Login: NextPage<Props> = ({ providers }) => {
console.log("Provider: ",providers)

  return(
    <div className="w-full flex flex-col ">
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="relative lg:w-screen h-[50vh] lg:h-[89vh] ">
          <Image
            src={twitterLogo}
            alt="twitter logo"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="flex justify-center">
          <div className="p-9 lg:pt-[3.7rem] w-screen sm:max-w-[590px] lg:min-w-[632px]">
            <div>
              <Image 
                src={twitter}
                height={48}
                width={48}
              />
            </div>
            <h1 className="font-head text-gray-900 text-[2.6rem] sm:text-[3.8rem] tracking-wide pt-[2.4rem] pb-[2rem] lg:py-[3.1rem] ">Happening now</h1>
            <h1 className="font-head text-[1.5rem]">Join Twitter today.</h1>
            <div className="flex flex-col py-4 space-y-4">
              <button className="bg-blue-400 py-[.85rem] px-10 rounded-full text-white font-bold hover:bg-blue-500 active:scale-95 transition ease-out ">Sign up</button>
              {/* Maps all the provider */}
              {Object.values(providers).map((provider: any) => (
                <button 
                  key={provider.id}
                  onClick={() => signIn(provider.id, { callbackUrl: "/" }).then(err => console.log('Error then: ',err)).catch(err => console.log('Catch err: ',err)) }
                  className="border-[1.8px] py-[.85rem] px-10 rounded-full border-gray-300 font-bold text-blue-500 hover:bg-blue-100 active:scale-95 transition ease-out">Log in with {provider.name}</button>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 px-2 w-full flex flex-wrap flex-row space-x-4 justify-center">
        <h1 className="footerButton">About</h1>
        <h1 className="footerButton">Help Center</h1>
        <h1 className="footerButton">Terms of Service</h1>
        <h1 className="footerButton">Privacy Policy</h1>
        <h1 className="footerButton">Cookie Policy</h1>
        <h1 className="footerButton">Accessibility</h1>
        <h1 className="footerButton">Ads info</h1>
        <h1 className="footerButton">Blog</h1>
        <h1 className="footerButton">Status</h1>
        <h1 className="footerButton">Careers</h1>
        <h1 className="footerButton">Brand Resources</h1>
        <h1 className="footerButton">Advertising Marketing</h1>
        <h1 className="footerButton">Twitter for Business</h1>
        <h1 className="footerButton">Developers</h1>
        <h1 className="footerButton">Directory</h1>
        <h1 className="footerButton">Settings</h1>
        <h1 className="footerButton">© 2022 Twitter, Inc.</h1>
      </div>
    </div>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}