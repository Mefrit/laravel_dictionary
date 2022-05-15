import React, { useState, useEffect } from 'react';
const RenderChoserLanguage = (props: any) => {
    return <div className="form-check form-switch col-1">
        <label className="form-check-label" >
            <input className="form-check-input" defaultChecked={false} onChange={(ev) => { props.onChange(ev) }} type="checkbox" />Rus/Eng
        </label>
    </div>
}
const WordsChoser = (props: any) => {
    const [show_translate, setShowTranslate] = useState(false);
    const [index_word, setIndexWord] = useState(0);
    const [mode_translate_word, setModeTranslateWord] = useState<string>("russian");
    useEffect(() => {
    }, [index_word]);
    // const deepCopy = (thing: any): any => {
    //     if (Array.isArray(thing)) {
    //         var copy = [];
    //         for (var i = 0; i < thing.length; i++)
    //             copy.push(deepCopy(thing[i]));
    //         return copy;
    //     } else if (thing === null) {
    //         return null;
    //     } else if (typeof thing === "object") {
    //         var copy: any[] = {};
    //         var keys = Object.keys(thing);
    //         for (var i = 0; i < keys.length; i++) {
    //             var key: any = keys[i];
    //             copy[key] = deepCopy(thing[key]);
    //         }
    //         return copy;
    //     } else {
    //         // Числа, строки, логические значения неизменяемые
    //         return thing;
    //     }
    // }
    const renderTextView = (list_words: any, mode_translate_word: string, index_word: number) => {
        return <div className='d-flex flex-column p-1 justify-content-around  '>
            <h4 className="font-weight-bold  border-primary border-bottom text-center" >{mode_translate_word == 'english' ? list_words[index_word].english_word : list_words[index_word].russian_word}</h4>
            <input type={show_translate ? "button" : "password"} defaultValue={mode_translate_word == 'english' ? list_words[index_word].russian_word : list_words[index_word].english_word}
                className={show_translate ? 'mt-3 btn btn-primary' : " mt-3 btn btn-primary disabled"} />
        </div>
    }
    const renderInterfaceButtons = (show_translate: boolean, index_word: number, list_words: any) => {
        return <div className='d-flex  justify-content-around'>
            <button className='btn btn-small btn-primary' onClick={() => { goBack(index_word, list_words) }}>Назад</button>
            <button className='btn btn-small btn-primary' onClick={() => { setShowTranslate(!show_translate) }}>{show_translate ? "Скрыть перевод" : "Показать перевод"}</button>
            <button className='btn btn-small btn-primary' onClick={() => { goForward(index_word, list_words) }}>Вперед</button>
        </div>
    }
    const goBack = (index_word: number, list_words: any) => {
        setShowTranslate(false);
        setIndexWord(index_word > 0 ? index_word - 1 : list_words.length - 1)
    }
    const changeLanguage = (ev: any) => {
        setShowTranslate(false);
        setModeTranslateWord(ev.target.checked ? "english" : "russian")
    }
    const goForward = (index_word: number, list_words: any) => {
        setShowTranslate(false);
        setIndexWord(index_word < list_words.length - 1 ? index_word + 1 : 0)
    }
    const renderInterface = (index_word: number, list_words: any, show_translate: boolean) => {
        return <div className='w-100 h-50 d-flex flex-column justify-content-around'>
            <RenderChoserLanguage onChange={changeLanguage} />


            {/*    {renderChoserLanguage({ onChange: (ev: any) => { changeLanguage(ev.target.checked); } })} */}
            {renderTextView(
                list_words,
                mode_translate_word,
                index_word
            )}
            {renderInterfaceButtons(show_translate, index_word, list_words)}
        </div >
    }
    return (
        <div className=" col-5 d-flex ">
            {props.list_words.length == 0 ? <h5>Список слов пуст. Выберите словарь</h5> : renderInterface(index_word, props.list_words, show_translate)}
        </div>
    );
};
export default WordsChoser;