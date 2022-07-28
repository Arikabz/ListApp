import React from "react"
import axios from "axios"
import "./styles.css"

export default class App extends React.Component{
    state = {
        lista: [],
    };
    componentDidMount() {
        axios.get("/lista.json").then((res) => {
            this.setState({ lista: res.data })
        })
    }


    render () {
        const {lista} = this.state;
        return (
            <div>
                <form>
                    <input type='text' placeholder="Aniadir a la lista"
                        name="item"/>
                    <input type='text' placeholder="Persona"
                        name="userID"/>
                    <input type='submit' />
                </form>
                <ul className='items'>
                    {lista.map((entry)=> (
                        <li className='item'>
                            <p>
                                <strong>#</strong>{entry.id}
                            </p>
                            <p>
                                <strong>{entry.item}</strong>
                            </p>
                            <p>
                                <span>by {entry.userID}</span>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

}
