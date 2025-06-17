import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface OrderDetailProps {
  symbol: string;
  quantity: string;
  exchange_platform: string;
}

const OrderDetail: React.FC<OrderDetailProps> = ({
  symbol,
  quantity,
  exchange_platform,
}) => {
  const [tokenPrice, setTokenPrice] = useState<string>("");

  useEffect(() => {
    async function fetchPrice() {
      try {
        if (exchange_platform === "Binance") {
           const newSymbol = symbol.toUpperCase() + "USDT";
          const res = await axios.get(
            `https://api.binance.com/api/v3/ticker/price?symbol=${newSymbol}`
          );
          setTokenPrice(res.data.price);
        }

        if (exchange_platform === "Deribit") {
          
          const newSymbol = symbol.toLowerCase() + "_usd";

          const res = await axios.get(
            `https://www.deribit.com/api/v2/public/get_index_price?index_name=${newSymbol}`
          );
          setTokenPrice(res.data.result.index_price);
        }

        if (exchange_platform === "Bybit") {
          const newSymbol = symbol.toUpperCase() + "USDT";
          const res = await axios.get(
            `https://api.bybit.com/v5/market/tickers?category=spot&symbol=${newSymbol}`
          );
          setTokenPrice(res.data.result.list[0].lastPrice);
        }

        if (exchange_platform === "OKX") {
          const newSymbol = symbol.toUpperCase() + "-USDT";

          const res = await axios.get(
            `https://www.okx.com/api/v5/market/ticker?instId=${newSymbol}`
          );
          setTokenPrice(res.data.data[0].last);
        }
      } catch (e) {
        console.error("Error fetching price:", e);
      }
    }

    fetchPrice();
  }, [symbol, exchange_platform]);

  const totalValue =
    parseFloat(quantity) && parseFloat(tokenPrice)
      ? (parseFloat(quantity) * parseFloat(tokenPrice)).toFixed(2)
      : "—";

  return (
    <Card className=" w-[40vb] mt-6 mb-52">
      <CardHeader>
        <CardTitle>🧾 Simulated OTC Order Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
        <div>
          <Label className="text-muted-foreground">Exchange</Label>
          <div>{exchange_platform}</div>
        </div>
        <div>
          <Label className="text-muted-foreground">Symbol</Label>
          <div>{symbol}</div>
        </div>
        <div>
          <Label className="text-muted-foreground">Quantity</Label>
          <div>{quantity}</div>
        </div>
        <div>
          <Label className="text-muted-foreground">Current Price</Label>
          <div>{tokenPrice || "Loading..."}</div>
        </div>
        <div>
          <Label className="text-muted-foreground">Total Order Value</Label>
          <div>{totalValue} USDT</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDetail;
