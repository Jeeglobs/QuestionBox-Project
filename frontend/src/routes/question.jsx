import { faArrowRight, faCaretLeft, faCaretRight, faCheck, faHeart, faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import moment from "moment"
import { useState, useEffect } from "react"
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { Input } from "../components/header";

export default function QuestionPage({ token, setIsLoginOpen }) {
  const [data, setData] = useState()
  const [answer, setAnswer] = useState()
  const [error, setError] = useState()
  const { pk } = useParams()
  

  useEffect( () => {
    const URL = 'https://questionbox-mgxz.onrender.com'
    axios.get(`${URL}/questions/${pk}`).then((res) => {
      setData(res.data)
    })

  }, [])
  
  const handleNewAnswer = (e) => {
    
  }
  
  const createFields = {
    title: "New Answer",
    inputs: [new Input("Answer", "text", answer, setAnswer, null),],
    onSubmit: handleNewAnswer
  }
  
  if (data) {
    console.log(data);
    return (
      <>
        <PageHeader data={data} />
        <div className="mx-6 grid grid-cols-1 divide-y">
          {<Question data={data} />}
          {/* {data.isAccepted && <AcceptedAnswer />} */}
          {/* {post new answers if logged in } */}
          <div>
            <form onSubmit={() => { token ? handleNewAnswer : setIsLoginOpen(true)}}>
              <div className="flex justify-between items-center my-2">
                <h3 className="text-xl font-bold mt-3">Answers</h3>
                <button type="submit" disabled={ answer ? false : true} className={`${answer ? "bg-indigo-600 hover:bg-indigo-500" : "bg-gray-400"} inline-flex items-center rounded-md border  px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                  Post Answer
                </button>
              </div>
                <textarea name="answer" id="answer" cols="50" rows="5" placeholder="Write an answer..." required={token?true:false} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
            </form>
            {data.answers.length? 
              data.answers.map((a) => <Answer key={a.pk} data={a} />) :
              <div className="h-96 flex items-center justify-center"><h1 className="h-64 text-2xl text-center font-bold text-gray-500">No answers!<br />...Yet</h1></div>}
          </div>
        </div>
         {/* <Modal fields={createFields} isOpen={isCreateAnswerOpen} setIsOpen={setIsCreateAnswerOpen} error={ error } /> */}
      </>

    )
  }

}

function PageHeader({data}) {
  //https://tailwindui.com/components/application-ui/headings/page-headings
  const navigate = useNavigate()

  const handleNext = () => navigate(`/question/${data.pk + 1}`)
  const handleBack = () => navigate(`/question/${data.pk - 1}`)

  return (
    <div className="">
      <div className="mx-6 mt-6 flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:tracking-tight">
            {data.title}
          </h2>
        </div>
        
        <div className="flex">
          {data.pk > 1 && <span className=" mr-1">
            <button
              onClick={handleBack}
              type="button"
              className="inline-flex border items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
              <FontAwesomeIcon icon={faCaretLeft} className="-ml-0.5 mr-1 h-5 w-5" aria-hidden="true" />
              Previous
            </button>
          </span>}
          {/* conditionally render if not no next */}
          {true && <span className="">
            <button
              onClick={handleNext}
              type="button"
              className="inline-flex items-center rounded-md border bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Next
              <FontAwesomeIcon icon={faCaretRight} className="ml-1 mr-0 h-5 w-5" aria-hidden="true" />
            </button>
          </span>}
        </div>
      </div>
    </div>
  )
}

function Question({data}) {
  return (
    <div className="">
      <div className="min-w-0 flex-1">
        <p className="text-sm mt-1"><Link to={`/user/${data.author}`} className="my-1 font-medium text-violet-600 dark:text-violet-300 hover:underline">{data.author}</Link> - { moment(data.time_created,).fromNow()} - {pluralize(data.answers.length, "answer")}</p>
        <p className="text-md mt-1 mb-6">{ data.text }</p>
      </div>
    </div>  
  )
}


function Answer({ data }) {
  const handleAccept = () => {}
  const handleFavorite = () => { }
  
  return (
     <div className="flex items-top justify-between">
      <div className="mr-2 mt-1 flex flex-col align-top">
        {/* show if logged in user = user */}
        <button
          onClick={handleAccept}
          type="button"
          className="inline-flex items-center rounded-md border bg-indigo-600 p-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <FontAwesomeIcon icon={faCheck} className="" aria-hidden="true" />
        </button>
        
        <button
          onClick={handleFavorite}
          type="button"
          className="inline-flex items-center rounded-md border bg-indigo-600 p-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {/* Make red if favorited */}
          <FontAwesomeIcon icon={faHeart} className="" aria-hidden="true" />
        </button>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm mt-1"><Link to={`/user/${data.author}`} className="my-1 font-medium text-violet-600 dark:text-violet-300 hover:underline">{data.author}</Link> - { moment(data.time_created,).fromNow()}</p>
        <p className="text-md mt-1 mb-6">{ data.text }</p>
      </div>
    </div>  
    // select best answer and heart
  )
}


const pluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;


