//supabase
// Create a single supabase client for interacting with your database
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1eHBybXN6c3VmdGRwZnZsZG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM0MDU2MjYsImV4cCI6MTk4ODk4MTYyNn0.rzaCsr6T7hw6zVplBdsJXjzVDPeVgVV7MjWcx86p6o0';

const SUPABASE_URL = "https://guxprmszsuftdpfvldmj.supabase.co";

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