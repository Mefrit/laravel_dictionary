import React, { useState, useEffect } from 'react';
const WordsChoser = (props: any) => {
    const [show_translate, setShowTranslate] = useState(false);
    const [index_word, setIndexWord] = useState(0);
    const [mode_translate_word, setModeTranslateWord] = useState<string>("russian");
    useEffect(() => {
    }, [index_word]);
    const renderInterface = (index_word: number, list_words: any) => {

        return <div className='w-100 h-50 d-flex flex-column justify-content-around'>
            <div className="form-check form-switch col-1">
                <label className="form-check-label" >
                    <input className="form-check-input" onChange={(ev) => { setShowTranslate(false); setModeTranslateWord(ev.target.checked ? "english" : "russian") }} type="checkbox" />Rus/Eng</label>
            </div>
            <div className='d-flex flex-column p-1 justify-content-around  '>
                <h4 className="font-weight-bold  border-primary border-bottom text-center" >{mode_translate_word == 'english' ? list_words[index_word].english_word : list_words[index_word].russian_word}</h4>
                <input type={show_translate ? "button" : "password"} value={mode_translate_word == 'english' ? list_words[index_word].russian_word : list_words[index_word].english_word}
                    className={show_translate ? 'mt-3 btn btn-primary' : " mt-3 btn btn-primary disabled"} />
            </div>
            <div className='d-flex  justify-content-around'>
                <button className='btn btn-small btn-primary' onClick={() => { setShowTranslate(false); setIndexWord(index_word > 0 ? index_word - 1 : props.list_words.length - 1) }}>Назад</button>
                <button className='btn btn-small btn-primary' onClick={() => { setShowTranslate(!show_translate) }}>{show_translate ? "Скрыть перевод" : "Показать перевод"}</button>
                <button className='btn btn-small btn-primary' onClick={() => { setShowTranslate(false); setIndexWord(index_word < props.list_words.length - 1 ? index_word + 1 : 0) }}>Вперед</button>
            </div>
        </div >
    }
    return (
        <div className=" col-5 d-flex ">
            {props.list_words.length == 0 ? <h5>Список слов пуст. Выберите словарь</h5> : renderInterface(index_word, props.list_words)}
        </div>
    );
};
export default WordsChoser;