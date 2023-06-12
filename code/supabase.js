const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function getDataAcao(){
	const { data: acao, errorAcao } = await _supabase.from('acao').select();
    return acao;
}


async function getDataAvaliacao(){
    const { data: avaliacao, errorAvaliacao } = await _supabase.from('avaliacao').select();
    if (errorAvaliacao==undefined)
        console.log(errorAvaliacao);
    return avaliacao;
}

async function getDataAnalise(){
    const { data: analises, errorAnalise } = await _supabase.from('analises').select();
    if (errorAnalise==undefined)
        console.log(errorAnalise);
    return analises;
}

async function getDataRendaFixa(){
    const { data: rendaFixa, errorRendaFixa } = await _supabase.from('renda_fixa').select();
    if (errorRendaFixa==undefined)
        console.log(errorRendaFixa);
    return rendaFixa;
}