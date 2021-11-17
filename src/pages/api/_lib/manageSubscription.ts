import { query as q } from "faunadb";
import { fauna as faunaClient } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {
  // Busca o usuário no Fauna pelo customerId
  const userRef = await faunaClient
    .query(
      q.Select(
        ["ref"],
        q.Get(q.Match(q.Index("user_stripe_customer_id"), customerId))
      )
    )
    .catch((error) => {
      console.error(`Error on Fauna: ${error}`);
      return;
    });

  // Buscar todos dados da subscription no Stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    user_id: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  // Salva os dados da subscription no Fauna
  await faunaClient
    .query(
      q.Create(q.Collection("subscriptions"), {
        data: { subscriptionData },
      })
    )
    .then((ret) => console.log(ret))
    .catch((error) => {
      console.error(`Error on Fauna: ${error}`);
      return;
    });
}
