import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { getCoinPosts } from '../services/fetchPosts';


const BrowserScreen = ({ route, navigation }) => {

    // App -> BrowserScreen

    const { symbol } = route.params;

    const [published_url, setPublished_Url] = useState('');
    const [posts, setPosts] = useState([
        {
            dataCard: {
                data: {
                    id: 0,
                    short_name: '',
                    published_url: '',
                },
                author: { username: '' },
            },
            date: 0,
        },
    ]);

    useEffect(() => {

        (async () => {

            await getCoinPosts(symbol).then((data) =>
                setPosts(
                    data.posts.sort(function (a, b) {
                        // ordenar pelas postagens mais recentes
                        return b.date - a.date;
                    })
                )
            );

        })()

    }, [symbol]);

    useEffect(() => {
        if (posts.lengt !== 0) {
            setPublished_Url(posts[0].dataCard.data.published_url);
        } else {
            console.log('error, post len ', posts.lengt)
        }

        // posts.slice(0,1).map(p=> console.log(JSON.stringify(p)))
    }, [posts]);

    const _handleOpenWithWebBrowser = () => {
        WebBrowser.openBrowserAsync(published_url);
    };

    return (
        <View style={styles.container}>
            {/*console.log('browser render')*/}
            <View style={styles.view_webview}>
                <WebView style={styles.webview} source={{ uri: published_url }} />
            </View>

            <View style={styles.view_picker}>
                <Picker
                    selectedValue={published_url}
                    style={styles.pickers}
                    itemStyle={styles.pickersItems}
                    onValueChange={(value, index) => setPublished_Url(value)}>
                    {posts.map((post, i) => {
                        return (
                            <Picker.Item
                                key={`_posts` + i}
                                label={post.dataCard.author.username}
                                value={post.dataCard.data.published_url}
                            />
                        );
                    })}
                </Picker>
                <Ionicons name="logo-chrome" size={24} color="black" onPress={_handleOpenWithWebBrowser} />
                <Ionicons
                    style={styles.icons}
                    name="caret-back-outline"
                    size={20}
                    color="#000000"
                    onPress={() => navigation.push('HomeScreen')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1', // #ecf0f1
        paddingTop: Constants.statusBarHeight,
        padding: 4,
    },
    view_webview: { flex: 1 },
    view_picker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        //minHeight: 200,
    },
    pickers: {
        width: 155,
        height: 88,
    },
    pickersItems: {
        height: 88,
    },
    icons: {},
});

export default BrowserScreen;