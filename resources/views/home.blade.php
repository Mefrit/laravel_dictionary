@extends('layout')
@section('title')Словарь@endsection
@section('maincontent')
    @csrf
    @if($errors->any())
        <div class="alert alert-danger">
            <ul>
               @foreach ($errors->all() as $error)
                    <li>{{$error}}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <div id="root"></div>
 
@endsection