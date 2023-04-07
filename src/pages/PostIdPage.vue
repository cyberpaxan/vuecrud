<template>
    <div>
        <h1>Это страница поста с ID = {{$route.params.id}}</h1>
        <br/>
        <h1>{{$route.params.title}}</h1>
        <br/>
        <h1>{{$route.params.body}}</h1>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>