import React, { useState, useEffect } from 'react';
const WordsChoser = (props: any) => {
    const [show_translate, setShowTranslate] = useState(false);
    const [index_word, setIndexWord] = useState(0);
    const [mode_translate_word, setModeTranslateWord] = useState<string>("russian");
    useEffect(() => {
    }, [index_word]);
    const renderChoserLanguage = (props: any) => {
        return <div className="form-check form-switch col-1">
            <label className="form-check-label" >
                <input className="form-check-input" onChange={(ev) => { props.onChange(ev) }} type="checkbox" />Rus/Eng
            </label>
        </div>
    }
    const renderTextView = (list_words: any, mode_translate_word: string, index_word: number) => {
        return <div className='d-flex flex-column p-1 justify-content-around  '>
            <h4 className="font-weight-bold  border-primary border-bottom text-center" >{mode_translate_word == 'english' ? list_words[index_word].english_word : list_words[index_word].russian_word}</h4>
            <input type={show_translate ? "button" : "password"} value={mode_translate_word == 'english' ? list_words[props.index_word].russian_word : list_words[index_word].english_word}
                className={show_translate ? 'mt-3 btn btn-primary' : " mt-3 btn btn-primary disabled"} />
        </div>
    }
    const renderInterfaceButtons = (props_actions: any, show_translate: boolean, index_word: number) => {

        return <div className='d-flex  justify-content-around'>
            <button className='btn btn-small btn-primary' onClick={() => { props_actions.goBack() }}>Назад</button>
            <button className='btn btn-small btn-primary' onClick={() => { props_actions.showTranslate() }}>{show_translate ? "Скрыть перевод" : "Показать перевод"}</button>
            <button className='btn btn-small btn-primary' onClick={() => { props_actions.goForward() }}>Вперед</button>
        </div>
    }
    const goBack = (index_word: number, list_words: any) => {
        setShowTranslate(false);
        setIndexWord(index_word > 0 ? index_word - 1 : list_words.length - 1)
    }
    const changeLanguage = (checked: boolean) => {
        setShowTranslate(false);
        setModeTranslateWord(checked ? "english" : "russian")
    }
    const goForward = (index_word: number, list_words: any) => {
        setShowTranslate(false);
        setIndexWord(index_word < list_words.length - 1 ? index_word + 1 : 0)
    }
    const renderInterface = (index_word: number, list_words: any, show_translate: boolean) => {
        return <div className='w-100 h-50 d-flex flex-column justify-content-around'>
            {renderChoserLanguage({ onChange: (ev: any) => { changeLanguage(ev.target.checked); } })};
            {renderTextView(
                list_words,
                mode_translate_word,
                index_word
            )}
            {renderInterfaceButtons({
                goBack: () => {
                    goBack(index_word, list_words);
                },
                showTranslate: () => {
                    setShowTranslate(!show_translate)
                },
                goForward: () => {
                    goForward(index_word, list_words);
                }
            }, show_translate, index_word)}
        </div >
    }
    return (
        <div className=" col-5 d-flex ">
            {props.list_words.length == 0 ? <h5>Список слов пуст. Выберите словарь</h5> : renderInterface(index_word, props.list_words, show_translate)}
        </div>
    );
};
export default WordsChoser;