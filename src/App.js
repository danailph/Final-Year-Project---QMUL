import { Header, Overlay, Visualiser } from 'components'

const App = () => <div className="algorithmic-visualiser-container">
    <Header />
    <div className="algorithmic-visualiser-content">
        <Visualiser />
    </div>
    <Overlay />

</div>


export default App;
