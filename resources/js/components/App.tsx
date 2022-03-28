import React, { useState, useEffect } from 'react';

export interface IUser {
    name: string;
    age: number;
}
const App = () => {
    const [users, setUsers] = useState<IUser[]>([
    ]);
    useEffect(() => {
        // Обновляем название докуммента, используя API браузера
        console.log("mount")
    }, []);
    return (
        <div className="container d-flex p-2 justify-content-center flex-column">
            <form className=" row" method="post">
                <div className=" col-5 d-flex justify-content-around">
                    <button className=" btn btn-secondary rounded-1">Выбрать словарь</button>
                    <label className=" btn btn-secondary  rounded-1"><input type="file" title=" " name="files" className="form-file-input" />Загрузить словарь</label>
                </div>

                <div className="form-check form-switch col-1">

                    <label className="form-check-label" >
                        <input className="form-check-input" type="checkbox" />
                        Rus/Eng</label>
                </div>
            </form>
            <div>
                <p>word1</p>
                <p>*****</p>
            </div>
            <div>
                <button>Показать перевод</button>
                <button>Следующее слово</button>
            </div>
            <p>Текущий словарь</p>
        </div>
    );
};

export default App;