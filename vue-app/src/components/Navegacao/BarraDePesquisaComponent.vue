<template>
    <div class="container">
        <input 
            type="text" 
            v-model="searchQuery" 
            @input="performSearch" 
            placeholder="Digite sua pesquisa" 
            class="search-input" 
        />
    </div>      
</template>

<script>
export default {
    name: "BarraDePesquisaComponent",
    data() {
        return {
            searchQuery: ''
        }
    },
    methods: {
        performSearch() {
            this.$emit('search', this.searchQuery);
        }
    }
}
</script>

<style scoped>
.container {
    position: relative;
    display: flex;
    width: 100%;
    max-width: 800px;
    min-width: 350px;
}

.search-input {
    padding: 14px;
    border: 1px solid #dadada;
    border-radius: 8px;
    width: 95%;
    height: 28px;
    color: #1b1b1b;
    font-family: 'Open Sans', sans-serif;
    font-size: 1.8rem;
    outline: none;

}


.search-input:focus{
    border: 0.3rem solid #008E4A;
}

.search-input:focus::placeholder{
    color: transparent;
}
::placeholder {
    color: #acacac;
    font-family: 'Inter', sans-serif;
    font-size: 2rem;
    letter-spacing: 0.8px;
    font-weight: 300;
}

@media screen and (max-width:600px) {
    .container{
        min-width: 200px;
    }
 }
</style>
