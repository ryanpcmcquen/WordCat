// "slug": "expo.io/@ryanpcmcquen/wordcat",
import React from 'react'
import Expo from 'expo'
import { Image } from 'react-native'
import {
    Body,
    Card,
    CardItem,
    Container,
    Content,
    DeckSwiper,
    Header,
    Spinner,
    Text,
    Title,
    View
} from 'native-base'

const fetchCat = async (self) =>
    await fetch('https://aws.random.cat/meow')
        .then((response) => response.json())
        .then((data) =>
            self.setState({ image: data.file, isLoadingCat: false })
        )

const fetchWord = async (self) =>
    await fetch('https://wordcat-pjbjtzmzutlv.runkit.sh/')
        .then((response) => response.json())
        .then((data) => self.setState({ data: data, isLoadingWord: false }))

export default class WordCat extends React.Component {
    state = { isLoadingCat: true, isLoadingWord: true }
    componentDidMount() {
        return Promise.all([fetchCat(this), fetchWord(this)])
    }
    render() {
        return (
            <Container style={{ marginTop: Expo.Constants.statusBarHeight }}>
                <Header>
                    <Body>
                        <Title>WordCat</Title>
                    </Body>
                </Header>
                <View>
                    <DeckSwiper
                        dataSource={'null'}
                        onSwipeRight={() => {
                            this.setState({ isLoadingCat: true })
                            return fetchCat(this)
                        }}
                        onSwipeLeft={() => {
                            this.setState({ isLoadingCat: true })
                            return fetchCat(this)
                        }}
                        renderItem={() => (
                            <React.Fragment>
                                <Card style={{ elevation: 3 }}>
                                    <CardItem>
                                        {this.state.isLoadingCat ? (
                                            <View
                                                style={{ alignItems: 'center' }}
                                            >
                                                <Spinner />
                                            </View>
                                        ) : (
                                                <Image
                                                    source={{
                                                        uri: this.state.image
                                                    }}
                                                    style={{
                                                        height: 200,
                                                        width: null,
                                                        flex: 1
                                                    }}
                                                />
                                            )}
                                    </CardItem>
                                </Card>
                                <Card
                                    transparent
                                    style={{ backgroundColor: '#ffffff' }}
                                >
                                    <Content padder>
                                        {this.state.isLoadingWord ? (
                                            <View
                                                style={{ alignItems: 'center' }}
                                            >
                                                <Spinner />
                                            </View>
                                        ) : (
                                                <React.Fragment>
                                                    <Text>
                                                        {this.state.data.word}
                                                    </Text>
                                                    <Text note>
                                                        {`${
                                                            this.state.data
                                                                .definitions[0]
                                                                .partOfSpeech
                                                            }\n${
                                                            this.state.data
                                                                .examples[0].text
                                                            }\n\n`}
                                                        {this.state.data.definitions.map(
                                                            (definition, index) =>
                                                                `${index + 1}. ${
                                                                definition.text
                                                                }\n\n`
                                                        )}
                                                    </Text>
                                                </React.Fragment>
                                            )}
                                    </Content>
                                </Card>
                            </React.Fragment>
                        )}
                    />
                </View>
            </Container>
        )
    }
}
