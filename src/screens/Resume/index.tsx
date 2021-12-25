import React,{useEffect,useState,useCallback} from 'react';
import {ActivityIndicator, Alert, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {VictoryPie} from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useTheme} from 'styled-components';

import {
    Container,
    Header,
    Title,
    Content,
    LoadContainer,
    ChartContainer
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
    total:number;
    totalFormatted:string;
    color:string;
    percent:string;
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

            const expensivesTotal = expensives.reduce((accumulator:number,expensive:TransactionData) => {
                return accumulator + Number(expensive.amount);
            },0)

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

                    const percent = `${(categorySum/expensivesTotal * 100 ).toFixed(0)}%` 

                    totalByCategory.push({
                        id:category.key,
                        name:category.name,
                        color:category.color,
                        totalFormatted:total,
                        total:categorySum,
                        percent
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
                        <Content
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingHorizontal:24,
                                paddingBottom:useBottomTabBarHeight(),
                            }}
                        >
                           <ChartContainer>
                            <VictoryPie
                                    data={totalByCategories}
                                    colorScale={totalByCategories.map(category => category.color)}
                                    style={{
                                        labels:{
                                            fontSize:RFValue(18),
                                            fontWeight:'bold',
                                            fill: theme.colors.shape
                                        }
                                    }}
                                    labelRadius={50}
                                    x="percent"
                                    y="total"
                                />
                           </ChartContainer>
                           
                            
                            {
                                totalByCategories.map(item => (
                                    <HistoryCard 
                                        key={item.id}
                                        title={item.name} 
                                        amount={item.totalFormatted} 
                                        color={item.color} />
                                ))
                                

                            }
                        </Content>
                    </>

            }
                      
        </Container>
    )
}