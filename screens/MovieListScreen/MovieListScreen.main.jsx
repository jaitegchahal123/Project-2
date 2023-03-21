import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Button, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { MovieCell } from "./components/MovieCell";
import { styles } from "./MovieListScreen.styles";


// We can use JSON files by simply requiring them.
const TABLE_DATA = require("../../assets/movies.json");


// Input: navigation & route params, which we recieve through React Navigation
// Output: a screen containing the list of movies
export default function MovieListScreen({ navigation, route }) {
 const [actor, setActor] = useState([]);
 // need to update current serch
 const [curr, setCurr] = useState("");


 // TODO: Fill out the methods below.
 const selectedMovie = (movieItem) => {
   navigation.navigate(
     "Movie DetailS", {movieItem: movieItem}
     )
 };


 const selectedFilterButton = () => {
   navigation.navigate(
     "Movie Filter", {actor: actor}
     )
 };


 useEffect(
   () => {
     // TODO: Add a "Filter" button to the right bar button.
     // It should lead to the MovieFilterScreen, and pass the "actors" state
     // variable as a parameter.
     navigation.setOptions({headerRight: () => (<Button onPress = {selectedFilterButton} title = "FILTER" />),});
   },
   [
     navigation
     /* TODO: Insert dependencies here. */
   ]
 );


 useEffect(
   () => {
     //make a dependency, so it looks cleaner earlier


     const currRoute = route.params.actor;


     if(route.params.actor) {setActor(currRoute);}
     /* TODO: Recieve the updated list of actors from the filter screen here.
         See https://reactnavigation.org/docs/params/#passing-params-to-a-previous-screen
         for an example of how to send data BACKWARDS in the navigation stack.
     */
   },
   [
     /* TODO: Insert dependencies here. What variable changes
       when we come back from the filter screen? */
       currRoute
         ]
 );


 // Renders a row of the FlatList.
 const renderItem = ({ item }) => {
   const overlapFound = (listA, listB) => {
     let foundActor = false;
     listA.forEach((x) => {
       if (listB.includes(x)) {
         foundActor = true;
       }
     });
     return foundActor;
   };


   // TODO: Set up search & filter criteria.
   let meetsSearchCriteria = true;
   if(item==true && curr==true && !item.title.includes(curr)){
     meetsSearchCriteria = false;
   }


   let meetsActorsCriteria = true;
   if(item && actor.length!=0 && !overlapFound(actor, item.actor)){
     meetsActorsCriteria = false;
   }


   // if(item == true && curr == true && !item.title.includes(curr)){
   //   meetsCurrCriteria = false;
   // }
   // if(item == true && actor.length!=0 && !overlapFound(actor, item.actor)){
   //   meetsActorsCriteria = false;
   // }


   if (meetsSearchCriteria && meetsActorsCriteria) {
     // TODO: Return a MovieCell, wrapped by a TouchableOpacity so we can handle taps.
     return (
       <TouchableOpacity onPress={()=>selectedMovie(item)}><MovieCell movieItem={item}/></TouchableOpacity>
     )
  //   <TouchableOpacity onPress = {() => selectedMovie(item)}> <MovieCell movieItem={{item}}/> </TouchableOpacity>
   } else {
     // If the item doesn't meet search/filter criteria, then we can
     // simply return null and it won't be rendered in the list!
     return null;
   }
 };


 // Our final view consists of a search bar and flat list, wrapped in
 // a SafeAreaView to support iOS.
 return (
   <SafeAreaView style={styles.container}>
     {/* TODO: Add a SearchBar: https://reactnativeelements.com/docs/searchbar/.
               The third-party package should already be installed for you. */}
       <SearchBar
         showLoading={false}
         onChangeText={setCurr}
         value={curr}
     />


              
              
     {/* TODO: Add a FlatList: https://reactnative.dev/docs/flatlist */}
     <FlatList
       data={TABLE_DATA}
       renderItem={renderItem}
       keyExtractor={item => item.id}
     />
   </SafeAreaView>
 );
}
