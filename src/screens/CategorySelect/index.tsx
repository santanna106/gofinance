    import React from 'react';
import { FlatList,TouchableOpacity } from 'react-native';
import {categories} from '../../utils/categories';


import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
    ButtonSelecionar,
    ButtonText
} from './styles';

interface Category {
    key:string;
    name:string;

}

interface Props {
    category:Category;
    setCategory:(category:Category) => void;
    closeSelectCategory:() => void;
}

export function CategorySelect ({
    category,
    setCategory,
    closeSelectCategory
}:Props) {

    function handleCategorySelect(item:Category){  
        setCategory(item);
    }

    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>
            <FlatList
                data={categories}
                style={{flex:1,width:'100%'}}
                keyExtractor={item => item.key}
                renderItem={({item}) =>
                 <Category
                    onPress={() => handleCategorySelect(item)   }
                    isActive={category.key === item.key}>
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                </Category>}
                ItemSeparatorComponent={() => <Separator/>}
            />

            <Footer>
               <ButtonSelecionar onPress={closeSelectCategory}>
                 <ButtonText>Selecionar</ButtonText>
               </ButtonSelecionar>
            </Footer>
        </Container>
    )
}