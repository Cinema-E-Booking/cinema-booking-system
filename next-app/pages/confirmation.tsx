import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getMovie, getScreening } from "../lib/api_references/movies"

export default function Home() {

  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();
  const data = router.query;

  useEffect(() => {
    setPrice(String(data.price))
    getMovieName(Number(data.movieId));
    getScreeningTime(Number(data.showId))
    sendEmails();
  }, [session, status]);

  const getMovieName = async (movieId: number) => {
    const response = await getMovie(movieId)

    setTitle(String(response.title))
  }

  const getScreeningTime = async (showId: number) => {
    const response = await getScreening(showId)

    setTime(response.startTime)
    console.log("Showing: ", response)
  }

  class EmailList {
    data: string;
    
    constructor(data: string) {
      this.data = data;
    }
  }
  

  const sendEmails = async () => {
          const startTime = new Date(time);    
          const movieTime = startTime.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })
          const emailList = new EmailList(session?.user?.email || "");
          const emailSubject = "You have succesfully booked the movie: " + title + " for " + price +"$ on " + time;
    try{
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailList: emailList , subject: `Order Confirmation`, 
          emailMessage: emailSubject }),
        });
  
        if(!response.ok) {
          
        }
    } catch (error) {
      console.error();
    }
  };


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Confirmation</title>
      </Head>
      <header>
        <h1>Booking Confirmed!</h1>
      </header>
        <main>
            <h2>Thank you for booking your movie.</h2>
            <p>
                Your movie <strong>[ {title} ]</strong> is booked for <strong>[ {price}$ ]</strong>{" "}
                on <strong>[ {
                                    (() => {
                                        const startTime = new Date(time);    
                                        return startTime.toLocaleString('en-US', {
                                          weekday: 'long',
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                          hour: 'numeric',
                                          minute: 'numeric',
                                          hour12: true,
                                        });
                                      })() || "loading"} ]</strong>
            </p>
            <p>Enjoy your show!</p>
            <button type="button" onClick={() => window.location.href = '/'}>
              Go back to Home
            </button>
        </main>
        <footer>
            <p>© 2024 Cinema E-Booking</p>
        </footer>
    </>
  );
}