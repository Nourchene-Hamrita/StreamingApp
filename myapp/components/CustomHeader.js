import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';


class CustomHeader extends Component {

    render() {
        let { title, isHome } = this.props
        return (
            <Header style={{ backgroundColor: "#4169e1" }}>
                <Left>{
                    isHome ?
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button> :
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                }
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name='search'onPress={() => this.props.navigation.navigate('Search')} />
                    </Button>
                    <Button transparent>
                        <Icon name='heart'  onPress={() => this.props.navigation.navigate('Playlist')}/>
                    </Button>
                    <Button transparent>
                        <Icon name='notifications' onPress={() => this.props.navigation.navigate('Notifications')}/>
                    </Button>
                </Right>
            </Header>


        );
    }
}
export default CustomHeader;