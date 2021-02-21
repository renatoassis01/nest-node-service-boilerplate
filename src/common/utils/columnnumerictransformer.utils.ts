/*
Observação: converte numeros com precisão, numeros de tamanhos até 17(por exemplo: 18000000000000.77) 
depois disso é arrendondado as ultimas casas não é convertido
in entity:
  
   @Column('numeric', {
      transformer: new ColumnNumericTransformerUtils(),
    })
    public myNumericColumn: number;
*/
export class ColumnNumericTransformerUtils {
  to(data: number): number {
    return data;
  }
  from(data: any): number {
    if (!!data && !isNaN(data))
      if (String(data).length <= 17) return parseFloat(data);
      else return data;
    return data;
  }
}
