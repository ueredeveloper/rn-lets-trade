/*  name: getPosts
    goal: search for coin posts*/
    export async function getCoinPosts(symbol) {
      
        let response = await fetch(
          'https://njs-lets-trade.ueredeveloper.repl.co/tradingview/coin-posts/' + symbol,
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
      