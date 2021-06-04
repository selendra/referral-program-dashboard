import Loading from "./Loading";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import NProgress from 'nprogress'

export default function PageLoading() {
  const Router = useRouter();

  const [loading, setLoading] = useState(false);

  // NProgress.configure({ showSpinner: publicRuntimeConfig.NProgressShowSpinner });

  Router.onRouteChangeStart = () => {
    // console.log('onRouteChangeStart triggered');
    NProgress.start();
  };

  Router.onRouteChangeComplete = () => {
    // console.log('onRouteChangeComplete triggered');
    NProgress.done();
  };

  Router.onRouteChangeError = () => {
    // console.log('onRouteChangeError triggered');
    NProgress.done();
  };
  // useEffect(() => {
  //   const handleStart = (url) => (url !== router.asPath) && setLoading(true);
  //   const handleComplete = (url) => (url === router.asPath) && setLoading(false);

  //   router.events.on('routeChangeStart', handleStart)
  //   router.events.on('routeChangeComplete', handleComplete)
  //   router.events.on('routeChangeError', handleComplete)

  //   return () => {
  //     router.events.off('routeChangeStart', handleStart)
  //     router.events.off('routeChangeComplete', handleComplete)
  //     router.events.off('routeChangeError', handleComplete)
  //   }
  // })
  
  // return loading && (<Loading />);
}