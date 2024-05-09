/*  name: getPosts
    goal: search for coin posts*/
    export async function getCoinPosts(symbol) {

       //'https://njs-lets-trade.ueredeveloper.repl.co/tradingview/coin-posts/' + symbol,
      
        let response = await fetch('https://18ed4a84-996a-410f-bf19-2e7496b4a3d8-00-2czzy6untss26.hacker.replit.dev/tradingview/coin-posts/'+ symbol,
          {
            method: 'GET',
            headers: {
              Accept: 'application/JSON',
              'Content-Type': 'application/JSON',
            },
          }
        );
        
      
        let i = {
          status: await response.status,
          posts: await response.json(),
        };
        return i;
      }
      