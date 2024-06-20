import { defineStore } from "pinia";
import coatImage from "../assets/coat_600.png";
import heelsImage from "../assets/heels_600.png";
import hoodieImage from "../assets/hoodie_600.png";
import jacketImage from "../assets/jacket_600.png";
import shirtImage from "../assets/shirt_600.png";
import sneakersImage from "../assets/sneakers_600.png";

export const useShopStore = defineStore("shop", {
  state: () => {
    return {
      forSale: [
        {
          id: "coat",
          title: "外套",
          price: 2999,
          photo: coatImage,
          description: "精选高端面料，融合经典设计与现代风尚的精华。此款西装外套，采用细腻羊毛混纺，确保极致舒适与恒温体验。其独到之处在于精准的剪裁，不仅沿袭了单排三扣的经典风范，更通过流线型翻领设计，凸显穿着者的挺拔身姿与不凡气质。每一个针脚，每一处细节，均承载着手工艺人的匠心独运——从手工挑边到定制纽扣，无不展现出对品质的执着追求。无论是正式商务场合，还是休闲时刻，这款西装外套都能成为您的品味代言，让您在人群中脱颖而出，尽显绅士风度。",
        },
        {
          id: "heels",
          title: "高跟鞋",
          price: 2124,
          photo: heelsImage,
          description: "这款高跟鞋，以其优雅的设计与卓越的舒适度，成为女性鞋柜中的必备单品。采用优质材料精制而成，鞋面镶嵌着细腻光泽，既显时尚又不失低调奢华。独特鞋跟设计，不仅拉长腿部线条，提升整体气质，更融入人体工程学原理，确保长时间穿着也能轻松自在。无论是搭配优雅礼服漫步宴会，还是搭配职业装驰骋职场，都能完美契合，展现穿着者无与伦比的魅力与自信。",
        },
        {
          id: "hoodie",
          title: "卫衣",
          price: 2499,
          photo: hoodieImage,
          description: "这款卫衣，以其独特的设计与舒适的穿着体验，成为街头与居家的时尚宠儿。采用柔软亲肤的棉混纺面料，透气吸汗，给予您全天候的自由与舒适。简约而不失个性的版型，结合宽松的剪裁与连帽设计，不仅便于活动，更为日常穿搭增添一抹随性与活力。胸前别致的图案点缀，展示年轻态度，无论是搭配牛仔裤出游，还是宅家放松，都能轻松驾驭，展现您独树一帜的潮流风格。",
        },
        {
          id: "jacket",
          title: "夹克",
          price: 2800,
          photo: jacketImage,
          description: "这款夹克以其精湛的工艺与时尚的设计，成为都市探险者与风格引领者的首选。精选耐磨防风面料，结合内层细腻保暖材质，既保证了出色的户外防护性能，又兼顾了穿着的温暖与舒适。经典立领设计搭配可调节袖口，不仅强化了夹克的防风保暖特性，更赋予穿戴者利落帅气的外形。前幅拉链与按扣双重闭合，确保风雨无忧的同时，增添了便捷与实用性。多口袋配置，既实用又能巧妙融入设计之中，满足日常携带小物的需求。无论是城市街头还是户外旅行，这款夹克都能让您在任何场合下，尽显个性风采与不凡品味。",
        },
        {
          id: "shirt",
          title: "T恤",
          price: 1190,
          photo: shirtImage,
          description: "这款T恤以其简约而不失格调的设计，成为衣橱中的必备经典。选用高品质纯棉面料，轻柔透气，亲肤舒适，即便炎炎夏日也能保持清爽。修身版型剪裁，恰到好处地勾勒身形，同时保留足够的活动空间，兼顾时尚与自在。胸前创意图案印刷，采用环保水墨，色彩持久鲜艳，为简约的基本款增添一抹个性与趣味，轻松搭配牛仔裤、休闲裤或短裙，无论是日常出行、朋友聚会还是休闲度假，都能让您展现轻松自在、充满活力的时尚态度。",
        },
        {
          id: "sneakers",
          title: "运动鞋",
          price: 2699,
          photo: sneakersImage,
          description: "这款运动鞋集创新科技与时尚设计于一体，专为追求性能与风格的运动爱好者打造。采用轻盈耐用的网眼布料与合成皮革拼接，确保极致透气性与支撑力，即使长时间运动也能保持双脚干爽舒适。内置缓震科技中底，有效吸收冲击力，为每一步提供能量反馈，保护双脚免受运动伤害。鞋底采用耐磨橡胶材质，搭配精心设计的纹路，增强抓地力，无论是在跑道、健身房还是城市街头，都能灵活应对各种地面条件。流线型的外观设计，结合时尚色彩搭配，让您在享受运动的同时，亦能引领潮流，展现独特个性。",
        },
      ],
      cart: [],
      addedMessageShown: false,
    };
  },
  getters: {
    cartQuantity() {
      return this.cart.reduce((prev, curr) => {
        return prev + curr.quantity;
      }, 0);
    },
    cartSubtotal() {
      return this.cart.reduce((prev, curr) => {
        return prev + curr.price * curr.quantity;
      }, 0);
    },
    cartShipping() {
      return (Math.ceil(this.cartQuantity / 10)) * 500;
    },
    cartTax() {
      return (this.cartSubtotal * 0.08);
    },
    cartTotal() {
      return this.cartSubtotal + this.cartShipping + this.cartTax;
    },
  },
  actions: {
    addToCart(item) {
      const existingId = this.cart
        .findIndex((cartItem) => cartItem.id === item.id);

      if (existingId !== -1) {
        this.cart[existingId].quantity += 1;
      } else {
        this.cart.push({
          ...item,
          quantity: 1,
        });
      }

      this.addedMessageShown = true;

      setTimeout(() => {
        this.addedMessageShown = false;
      }, 2000);
    },
    removeItem(removedItem) {
      this.cart = this.cart.filter((item) => item.id !== removedItem.id);
    },
  },
});
