import React from "react";
import { SafeAreaView, Text, Image, ScrollView } from "react-native";
import { styles } from "./MovieDetailScreen.styles";


export default function MovieDetailScreen({ route }) {
 // TODO: Recieve the movieItem by destructuring route params.
 const {movieItem} = route.params;




 return (
   <SafeAreaView style={styles.container}>
     <ScrollView style={styles.container}>
       {/* TODO: Configure this screen to have an image and appropriate text describing the movie.
               See the example on the spec for design inspiration.
               Feel free to use the styles below. */ }
        <View style = {styles.img}>
         <Image style ={{resizeMode:"contain", height:200, width: 200}}source = {{uri: movieItem.posterurl}}/>
       </View>


       <Text style ={styles.h1}>{movieItem.title}</Text>


       <Text style ={styles.h2}> YEAR {movieItem.year}</Text>


       <Text style ={styles.h2}> TYPE {movieItem.genres}</Text>
      
       <Text style ={styles.h3}> ACTORS: {movieItem.actors}</Text>
      
       <Text style ={styles.h4}>DETAILS: {movieItem.storyline}</Text>
  
     </ScrollView>
   </SafeAreaView>
 );
}


