import React, { useState, useEffect } from 'react';

const AddDictionaryComponent = () => {
    return <form encType="multipart/form-data" method='post' className=" col-5 d-flex flex-column form-group justify-content-evenly h-50 w-100   align-items-center" action="/dictionary/add">
        <label className="d-flex flex-column justify-content-center"><p className="text-center">Выбрать EXEL файл</p><input type="file" title=" " name="file_dictionary" className=" btn btn-default form-control rounded-1" /></label>
        <input type="text" className="form-control w-25" name="name_dictionary" placeholder='name dictionary' />
        <input type="submit" className="btn btn-primary" value={"Загрузить словарь"} />
    </form>;
};

export default AddDictionaryComponent;