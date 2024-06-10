import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, FlatList, Image } from "react-native";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);

  const fetchPokemonData = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await response.json();
      setPokemonData(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const renderPokemon = ({ item }) => {
    return (
      <View style={estilos.pokemonContainer}>
        <Image
          style={estilos.pokemonImage}
          source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split("/")[6]}.png` }}
        />
        <Text style={estilos.pokemonName}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.tituloContainer}>
        <Text style={estilos.titulo}>Pokedex</Text>
      </View>
      <View style={estilos.barraDeBuscarContainer}>
        <TextInput style={estilos.barraDeBuscar} placeholder="Buscar pokemon" />
      </View>
      <FlatList
        data={pokemonData}
        renderItem={renderPokemon}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  
  contenedor: {
    
    backgroundColor: "#7b62a3"
  },
  
  tituloContainer: {
    
    alignItems: "center",
    marginTop: 50
   
  },
  
  titulo: {
    fontSize: 30
  },
  
  barraDeBuscarContainer: {
    alignItems: "center",
    
  },
  
  barraDeBuscar: {
    width: "80%",
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 100,
    marginTop: 30
  },
  
  pokemonContainer: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#a52a2a",
    alignItems: "center",
    flexDirection: "row"
  },
  
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  
  pokemonName: {
    fontSize: 18,
    color: "#ff0000"
  }
});

export default App;