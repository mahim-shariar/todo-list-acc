import React, { useCallback, useEffect, useReducer, useRef} from "react";
// import { json } from "stream/consumers";


interface Todo {
    id: number,
    text: string
}

type ActionType = { type: "ADD"; text: string } | { type: "REMOVE"; id: number }

let alltodos = JSON.stringify(localStorage.getItem('list'))
let newtodos = JSON.parse(alltodos);
let addtooot = JSON.parse(newtodos)

const Add_todo = () => {
    const nameRef = useRef<HTMLInputElement>(null)

    function reducer(state: Todo[], action: ActionType) {
        switch (action.type) {
            case 'ADD':
                return [
                    ...state,
                    {
                        id: state.length,
                        text: action.text,
                    }
                ]
            case 'REMOVE':
                return (
                    state.filter(({ id }) => id !== action.id)
                )
        }
    }


    const [todos, dispatch] = useReducer(reducer, addtooot);

    const Addtodo = useCallback(() => {
        if (nameRef.current && nameRef.current.value !== '') {
            dispatch({
                type: 'ADD',
                text: nameRef.current.value
            })
            nameRef.current.value = '';
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(todos))
    }, [todos])

    const RemoveTodo = (id: number) => {
        dispatch({
            type: 'REMOVE',
            id: id
        })
    }

    return (
        <div>
            <h1> ADD MEMBER </h1>
            <input style={{ 
                padding:'7px',
                width:'20%',
                border:`solid gray 1px`,
                borderRadius:'3px',
            }} ref={nameRef} type="text" />
            <button style={{
                backgroundColor:'#58bd58',
                border:'1px solid #58bd58',
                padding:"7px",
                width:'50px',
                marginLeft:"2px",
                borderRadius:"3px",
                color:"white",
                fontWeight:"bolder"
                
            }} onClick={Addtodo} > Add </button>
            {
                todos.map(todo => <div style={{
                    textAlign:'right',
                    width:'62%'
                }} key={todo.id}>
                    <p style={{
                        fontWeight:"bolder"
                    }} > {todo.text} <button style={{
                        backgroundColor:'#ed3535',
                        border:"1px solid #ed3535",
                        borderRadius:'3px'
                    }} onClick={() => RemoveTodo(todo.id)} > X </button> </p>
                </div>
                )
            }
        </div>
    );
};

export default Add_todo;