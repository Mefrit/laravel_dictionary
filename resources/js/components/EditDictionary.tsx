import React, { useState, useEffect } from 'react';
export const EditDictionary = (props: any) => {
    const name_dictionary = props.name;
    const id_dictionary = props.id_dictionary;
    const [russian_word, setRussianWord] = useState<string>("chose");
    const [english_word, setEnglishWord] = useState<string>("chose");
    useEffect(() => {

        // fetch('/dictionary/edit', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify({})
        // }).then((answer: any) => {
        //     if (answer.result) {
        //         setListDicionary(answer.list)
        //     }
        // });

    });
    const setRussianWordEvent = (ev: any) => {
        const value = ev.target.value;
        setRussianWord(value)
    }
    if (id_dictionary == -1) {
        return <h4>Выберите словарь</h4>
    }
    return <form className='d-flex flex-column justify-content-around h-50'>
        <input type="text" className='btn btn-small ' onChange={setRussianWordEvent} name="russian_word" placeholder='Английская версия' />
        <input type="text" className='btn btn-small ' onChange={(ev) => setEnglishWord(ev.target.value)} name="english_word" placeholder='Русская версия' />
        <input type="button" className='btn btn-small btn-primary' onClick={() => { props.addWord2List(russian_word, english_word) }} value="Добавить слово" />
    </form>
}