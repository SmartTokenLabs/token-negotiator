

const BookingPage = ({ tokens, negotiator }) => {

  // do something with tokens

  return (
    <div>
      { 
        tokens && tokens.map((token, index) => {
          return <div style={{ border: '1px solid black', padding: '12px', margin: '12px' }} key={index}>
            <p><b>TOKEN</b></p>
            <p>devconId: { token.devconId }</p>
            <p>ticketClass: { token.ticketClass }</p>
            <p>ticketId: { token.ticketId }</p>
          </div>
        }) 
      }
    </div>
  )
}

export default BookingPage;