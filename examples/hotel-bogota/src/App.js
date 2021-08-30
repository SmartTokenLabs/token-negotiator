import DevconTokenProvider from './DevconTokenProvider';
import BookingPage from './BookingPage';

const App = () => {
  return (
    <DevconTokenProvider
      render={({ negotiator, tokens }) => (
        <div>
          <BookingPage negotiator={negotiator} tokens={tokens} />
          <div className="tokenSelectorContainerElement" style={{position: 'fixed', right: 0, bottom: 0}}></div>
        </div>
      )}
    />
  )
}

export default App;