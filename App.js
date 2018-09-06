// "slug": "expo.io/@ryanpcmcquen/wordcat",
import React from 'react';
import Expo from 'expo';
import { Image } from 'react-native';
import {
    Body,
    Card,
    CardItem,
    Container,
    DeckSwiper,
    Header,
    Spinner,
    Text,
    Title,
    View
} from 'native-base';

const fetchCat = async (self) =>
    await fetch('https://aws.random.cat/meow')
        .then((response) => response.json())
        .then((data) => self.setState({ image: data.file }));

const fetchWord = async (self) =>
    await fetch('https://wordcat-pjbjtzmzutlv.runkit.sh/')
        .then((response) => response.json())
        .then((data) => self.setState({ data: data, isLoading: false }));

export default class DeckSwiperExample extends React.Component {
    state = { isLoading: true };
    componentDidMount() {
        return Promise.all([fetchCat(this), fetchWord(this)]);
    }
    render() {
        return this.state.isLoading ? (
            <View style={{ flex: 1, padding: 80 }}>
                <Spinner />
            </View>
        ) : (
            <Container style={{ marginTop: Expo.Constants.statusBarHeight }}>
                <Header>
                    <Body>
                        <Title>WordCat</Title>
                    </Body>
                </Header>
                <View>
                    <DeckSwiper
                        dataSource={'null'}
                        onSwipeRight={() => fetchCat(this)}
                        onSwipeLeft={() => fetchCat(this)}
                        renderItem={() => (
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Image
                                        source={{ uri: this.state.image }}
                                        style={{ height: 200, width: null, flex: 1 }}
                                    />
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>{this.state.data.word}</Text>
                                        <Text note>
                                            {`${this.state.data.definitions[0].partOfSpeech}\n${
                                                this.state.data.examples[0].text
                                            }\n\n`}
                                            {this.state.data.definitions.map(
                                                (definition, index) =>
                                                    `${index + 1}. ${definition.text}\n\n`
                                            )}
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        )}
                    />
                </View>
            </Container>
        );
    }
}
