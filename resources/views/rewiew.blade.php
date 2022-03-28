@extends('layout')
@section('title')Отзывы @endsection
@section('maincontent')
    <form method="post" action="/rewiew/check">
        @csrf
        <input type="email" name="email" placeholder="Email">
        <input type="text" name="text" placeholder="отзыв">
        <button type="submit">Send</button>
    </form>
@endsection 