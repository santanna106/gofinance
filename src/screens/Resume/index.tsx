import React,{useEffect,useState,useCallback} from 'react';
import {ActivityIndicator, Alert, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {useTheme} from 'styled-components';


import {
    Container,
    Header,
    Title,
    Content,
    LoadContainer
} from './styles';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

interface TransactionData {
    type:'positive' | 'negative';
    name:string;
    amount:string;
    category: string;
    date:string;
}

interface CategoryData{
    id:string;
    name:string;
    total:string;
    color:string;
}

const dataKey = '@gofinance:transactions';

export function Resume(){
    const [loading,setLoading] = useState(true);
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    
   const theme = useTheme();

    async function loadData(){       
            setLoading(true);    
            const response = await AsyncStorage.getItem(dataKey);
            const responseFormatted = response ? JSON.parse(response) : [];


            const expensives = responseFormatted
                              .filter((expensive:TransactionData) => expensive.type === 'negative');

            
       
            
            const totalByCategory:CategoryData[] = [];

            categories.forEach(category => {
                let categorySum = 0;

                expensives.forEach((expensive:TransactionData) => {
                    if(expensive.category === category.key){
                        categorySum += Number(expensive.amount);
                    }
                })
                if(categorySum > 0){
                    let total = categorySum
                               .toLocaleString('pt-Br',{
                                   style:'currency',
                                   currency:'BRL'
                                });

                    totalByCategory.push({
                        id:category.key,
                        name:category.name,
                        color:category.color,
                        total:total
                    })
                }
            });

            setTotalByCategories(totalByCategory);
            setLoading(false);
    }
    useEffect(()=>{
        loadData();
    },[])

    useFocusEffect(useCallback(() => {
        loadData();
     },[]));


    return (
        <Container>
            {
                  loading ? <LoadContainer>
                                <ActivityIndicator color={theme.colors.primary} size="large" />
                            </LoadContainer>
                    : 
                    <>
                        <Header>
                            <Title>Resumo</Title>
                        </Header>
                        <Content >
                            {
                                totalByCategories.map(item => (
                                    <HistoryCard 
                                        key={item.id}
                                        title={item.name} 
                                        amount={item.total} 
                                        color={item.color} />
                                ))
                                

                            }
                        </Content>
                    </>

            }
                      
        </Container>
    )
}