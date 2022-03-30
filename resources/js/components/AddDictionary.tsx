import React, { useState, useEffect } from 'react';

const AddDictionaryComponent = () => {

    useEffect(() => {
        // Обновляем название докуммента, используя API браузера
        console.log("mount")
    }, []);
    return <form encType="multipart/form-data" method='post' className=" col-5 d-flex flex-column " action="/dictionary/add">
        <label className=" btn btn-default rounded-1">Выбрать EXEL файл<input type="file" title=" " name="file_dictionary" className="form-file-input btn " /></label>
        <input type="text" name="name_dictionary" placeholder='name dictionary' />
        <input type="submit" value={"Загрузить словарь"} />
    </form>;
};

export default AddDictionaryComponent;