import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  public type DietCondition = {
    #PCOS;
    #Diabetes;
    #CVD;
    #WeightLoss;
    #WeightGain;
  };

  public type DietPlan = {
    id : Nat;
    name : Text;
    condition : DietCondition;
    overview : Text;
    recommendedFoods : [Text];
    foodsToAvoid : [Text];
    mealTimingTips : Text;
    mealPlan : [DayMeal];
  };

  public type DayMeal = {
    day : Text;
    breakfast : Text;
    lunch : Text;
    dinner : Text;
    snacks : Text;
  };

  public type Recipe = {
    id : Nat;
    name : Text;
    description : Text;
    conditionTags : [DietCondition];
    ingredients : [Text];
    instructions : [Text];
    prepTime : Nat;
    calories : Nat;
    protein : Nat;
    carbs : Nat;
    fat : Nat;
    imageUrl : Text;
  };

  public type ConsultancyRequest = {
    id : Nat;
    name : Text;
    email : Text;
    condition : Text;
    message : Text;
    submittedAt : Text;
  };

  // Storage
  let dietPlans = Map.empty<Nat, DietPlan>();
  let recipes = Map.empty<Nat, Recipe>();
  let consultancyRequests = Map.empty<Nat, ConsultancyRequest>();
  var nextConsultancyId : Nat = 1;

  // Initialize with sample data
  public shared ({ caller }) func initializeData() : async () {
    if (dietPlans.size() > 0) {
      Runtime.trap("Already initialized.");
    };

    let samplePlans = List.fromArray<DietPlan>([
      {
        id = 1;
        name = "PCOS Balanced Diet";
        condition = #PCOS;
        overview = "A diet focused on hormone balance and blood sugar control for PCOS management.";
        recommendedFoods = ["Leafy greens", "Lean proteins", "Whole grains", "Berries", "Flaxseeds", "Legumes", "Fatty fish", "Nuts and seeds", "Anti-inflammatory spices"];
        foodsToAvoid = ["Sugary snacks", "Refined carbs", "Processed foods", "Dairy (limit)", "Alcohol", "Caffeine (excess)", "Trans fats", "High-glycemic foods"];
        mealTimingTips = "Eat regular meals every 3-4 hours. Never skip breakfast. Have a protein-rich snack mid-morning and mid-afternoon. Avoid large meals late at night.";
        mealPlan = [];
      },
      {
        id = 2;
        name = "Diabetes-Friendly Plan";
        condition = #Diabetes;
        overview = "Low glycemic diet to help manage blood sugar levels throughout the day.";
        recommendedFoods = ["Non-starchy vegetables", "Lean meats", "Whole grains", "Legumes", "Nuts", "Berries", "Greek yogurt", "Eggs", "Avocado", "Olive oil"];
        foodsToAvoid = ["Sugary drinks", "White bread", "White rice", "Pastries", "Candy", "Fried foods", "Full-fat dairy", "Sweetened cereals", "Fruit juices"];
        mealTimingTips = "Eat smaller meals every 3-4 hours to maintain stable blood sugar. Pair carbs with protein or fat. Avoid skipping meals. Check blood sugar 2 hours after eating.";
        mealPlan = [];
      },
      {
        id = 3;
        name = "Cardio Health Diet";
        condition = #CVD;
        overview = "Heart-healthy diet focusing on good fats, fiber, and anti-inflammatory foods.";
        recommendedFoods = ["Oily fish (salmon, mackerel)", "Avocados", "Berries", "Walnuts", "Olive oil", "Leafy greens", "Whole grains", "Legumes", "Dark chocolate (70%+)", "Green tea"];
        foodsToAvoid = ["Processed meats", "Trans fats", "Fried foods", "Excessive salt", "Full-fat dairy", "Sugary beverages", "Red meat (limit)", "Refined grains", "Alcohol (excess)"];
        mealTimingTips = "Eat 3 balanced meals with 1-2 light snacks. Avoid late-night meals. Focus on portion control. Use smaller plates to prevent overeating.";
        mealPlan = [];
      },
      {
        id = 4;
        name = "Weight Loss Plan";
        condition = #WeightLoss;
        overview = "Calorie-controlled diet with emphasis on protein and fiber for sustainable fat loss.";
        recommendedFoods = ["Lean meats", "Vegetables", "Legumes", "Whole grains", "Eggs", "Greek yogurt", "Berries", "Green tea", "Soup broths", "High-fiber fruits"];
        foodsToAvoid = ["Fried foods", "Sugary desserts", "Alcohol", "High-calorie sauces", "White bread", "Chips and crackers", "Sugary drinks", "Processed snacks", "Full-fat dressings"];
        mealTimingTips = "Eat more frequently in smaller portions (5-6 times/day). Never skip breakfast. Drink water before meals. Stop eating 2-3 hours before bed.";
        mealPlan = [];
      },
      {
        id = 5;
        name = "Weight Gain Plan";
        condition = #WeightGain;
        overview = "High-calorie, nutrient-dense diet for healthy muscle and mass building.";
        recommendedFoods = ["Nuts and nut butters", "Dairy", "Whole eggs", "Oats", "Bananas", "Sweet potatoes", "Avocados", "Lean meats", "Whole grain pasta", "Quinoa"];
        foodsToAvoid = ["Empty-calorie junk food", "Sugary drinks", "Alcohol", "Excessive caffeine", "Low-calorie fillers", "Skipping meals"];
        mealTimingTips = "Eat every 2-3 hours including calorie-dense snacks. Never skip meals. Add extra calorie boosters like nut butter and olive oil. Eat a large meal post-workout.";
        mealPlan = [];
      },
    ]);

    let sampleRecipes = List.fromArray<Recipe>([
      // PCOS recipes
      {
        id = 1;
        name = "Grilled Chicken & Greens Salad";
        description = "Hormone-balancing salad with lean protein, leafy greens, and anti-inflammatory dressing. Perfect for PCOS management.";
        conditionTags = [#PCOS, #WeightLoss];
        ingredients = ["150g chicken breast", "2 cups mixed greens", "1/2 cucumber", "Cherry tomatoes", "1 tbsp flaxseeds", "1 tbsp olive oil", "Lemon juice", "Turmeric pinch"];
        instructions = ["Season chicken with turmeric and salt", "Grill chicken 6-7 min each side", "Chop cucumber and halve tomatoes", "Combine greens, cucumber, tomatoes", "Slice chicken and place on top", "Drizzle olive oil and lemon juice", "Sprinkle flaxseeds and serve"];
        prepTime = 25;
        calories = 320;
        protein = 34;
        carbs = 12;
        fat = 14;
        imageUrl = "";
      },
      {
        id = 2;
        name = "Quinoa Berry Breakfast Bowl";
        description = "Low-GI breakfast bowl with quinoa, mixed berries, and seeds to support hormone balance and reduce PCOS inflammation.";
        conditionTags = [#PCOS];
        ingredients = ["1/2 cup quinoa", "1 cup almond milk", "1/2 cup mixed berries", "1 tbsp chia seeds", "1 tsp honey", "Cinnamon to taste"];
        instructions = ["Cook quinoa in almond milk for 15 min", "Let cool slightly", "Top with mixed berries", "Add chia seeds and cinnamon", "Drizzle with honey and serve"];
        prepTime = 20;
        calories = 310;
        protein = 11;
        carbs = 48;
        fat = 8;
        imageUrl = "";
      },
      {
        id = 3;
        name = "Spearmint & Flaxseed Smoothie";
        description = "Anti-androgenic smoothie with spearmint and flaxseeds to help reduce testosterone levels in PCOS.";
        conditionTags = [#PCOS];
        ingredients = ["1 cup spearmint tea (cooled)", "1 banana", "1 tbsp ground flaxseed", "1/2 cup spinach", "1/2 cup frozen berries", "1 tsp honey"];
        instructions = ["Brew spearmint tea and cool", "Add all ingredients to blender", "Blend until smooth", "Serve immediately"];
        prepTime = 10;
        calories = 220;
        protein = 5;
        carbs = 42;
        fat = 5;
        imageUrl = "";
      },
      {
        id = 4;
        name = "Lentil & Spinach Soup";
        description = "Iron-rich, hormone-supporting soup with lentils and spinach. Great for PCOS women with low iron.";
        conditionTags = [#PCOS, #WeightLoss];
        ingredients = ["1 cup red lentils", "2 cups spinach", "1 onion", "2 garlic cloves", "1 carrot", "1 tsp cumin", "1 tsp turmeric", "4 cups vegetable broth", "Olive oil"];
        instructions = ["Saute onion and garlic in olive oil", "Add carrot, cumin, turmeric and cook 2 min", "Add lentils and broth, bring to boil", "Simmer 20 min until lentils are soft", "Stir in spinach and cook 2 more min", "Season and serve"];
        prepTime = 35;
        calories = 280;
        protein = 17;
        carbs = 42;
        fat = 5;
        imageUrl = "";
      },
      // Diabetes recipes
      {
        id = 5;
        name = "Egg & Veggie Scramble";
        description = "Low-carb, high-protein breakfast with non-starchy vegetables to keep blood sugar stable.";
        conditionTags = [#Diabetes, #WeightLoss];
        ingredients = ["3 eggs", "1/2 cup bell peppers", "1/2 cup spinach", "1/4 cup mushrooms", "1 tbsp olive oil", "Salt and pepper", "Fresh herbs"];
        instructions = ["Chop all vegetables", "Heat olive oil in pan", "Saute vegetables 3-4 min", "Whisk eggs with salt and pepper", "Pour eggs over vegetables", "Scramble gently until cooked", "Top with fresh herbs"];
        prepTime = 15;
        calories = 260;
        protein = 20;
        carbs = 8;
        fat = 17;
        imageUrl = "";
      },
      {
        id = 6;
        name = "Turkey & Veggie Lettuce Wraps";
        description = "Low-carb wraps using lettuce instead of bread, perfect for diabetes blood sugar management.";
        conditionTags = [#Diabetes, #WeightLoss];
        ingredients = ["150g ground turkey", "Large lettuce leaves", "1/2 cup shredded carrots", "1/4 cup diced water chestnuts", "2 tbsp low-sodium soy sauce", "Ginger", "Garlic"];
        instructions = ["Cook turkey with garlic and ginger", "Add soy sauce and cook through", "Mix in carrots and water chestnuts", "Spoon mixture into lettuce cups", "Garnish and serve"];
        prepTime = 20;
        calories = 240;
        protein = 28;
        carbs = 10;
        fat = 9;
        imageUrl = "";
      },
      {
        id = 7;
        name = "Cinnamon Oatmeal with Nuts";
        description = "Slow-release oats with cinnamon to help regulate blood sugar. Nuts add healthy fats and slow digestion.";
        conditionTags = [#Diabetes];
        ingredients = ["1/2 cup rolled oats", "1 cup unsweetened almond milk", "1 tsp cinnamon", "1 tbsp walnuts", "1 tbsp almonds", "1/2 cup blueberries", "Stevia to taste"];
        instructions = ["Cook oats in almond milk", "Stir in cinnamon", "Top with blueberries", "Add chopped nuts", "Sweeten with stevia if desired"];
        prepTime = 10;
        calories = 290;
        protein = 10;
        carbs = 38;
        fat = 12;
        imageUrl = "";
      },
      {
        id = 8;
        name = "Grilled Tilapia with Roasted Veggies";
        description = "Lean protein with low-GI vegetables. A balanced, diabetes-friendly dinner.";
        conditionTags = [#Diabetes, #WeightLoss];
        ingredients = ["180g tilapia fillet", "1 cup broccoli", "1 cup zucchini", "1 cup cauliflower", "Olive oil", "Lemon", "Garlic", "Italian herbs"];
        instructions = ["Preheat oven to 200C", "Toss vegetables in olive oil and herbs", "Roast vegetables 20 min", "Season tilapia with lemon and garlic", "Grill fish 4-5 min each side", "Plate and serve together"];
        prepTime = 30;
        calories = 310;
        protein = 38;
        carbs = 14;
        fat = 11;
        imageUrl = "";
      },
      // CVD recipes
      {
        id = 9;
        name = "Salmon with Quinoa & Broccoli";
        description = "Rich in omega-3 fatty acids, this dish reduces inflammation and supports cardiovascular health.";
        conditionTags = [#CVD, #PCOS];
        ingredients = ["180g salmon fillet", "1/2 cup quinoa", "1 cup broccoli", "1 tbsp olive oil", "Lemon juice", "Dill", "Garlic"];
        instructions = ["Cook quinoa per package instructions", "Season salmon with dill and garlic", "Bake salmon at 190C for 15 min", "Steam broccoli 5 min", "Plate quinoa, add salmon and broccoli", "Drizzle with olive oil and lemon"];
        prepTime = 35;
        calories = 420;
        protein = 40;
        carbs = 28;
        fat = 16;
        imageUrl = "";
      },
      {
        id = 10;
        name = "Avocado & Egg Toast";
        description = "Heart-healthy breakfast with good monounsaturated fats from avocado and protein from eggs.";
        conditionTags = [#CVD, #WeightLoss];
        ingredients = ["2 slices whole grain bread", "1 ripe avocado", "2 poached eggs", "Cherry tomatoes", "Red pepper flakes", "Lemon juice", "Salt"];
        instructions = ["Toast whole grain bread", "Mash avocado with lemon, salt, and pepper", "Spread avocado on toast", "Poach eggs to preference", "Top with eggs and cherry tomatoes", "Sprinkle red pepper flakes"];
        prepTime = 15;
        calories = 380;
        protein = 18;
        carbs = 34;
        fat = 22;
        imageUrl = "";
      },
      {
        id = 11;
        name = "Walnut & Berry Overnight Oats";
        description = "Cholesterol-lowering oats with antioxidant-rich berries and heart-protective walnuts.";
        conditionTags = [#CVD];
        ingredients = ["1/2 cup rolled oats", "1 cup oat milk", "1/4 cup walnuts", "1/2 cup mixed berries", "1 tsp flaxseed", "1 tsp maple syrup"];
        instructions = ["Combine oats and oat milk in jar", "Stir in flaxseed and maple syrup", "Refrigerate overnight", "Top with berries and walnuts before serving"];
        prepTime = 5;
        calories = 350;
        protein = 12;
        carbs = 44;
        fat = 16;
        imageUrl = "";
      },
      {
        id = 12;
        name = "Mediterranean Chickpea Salad";
        description = "Fiber-packed salad with heart-healthy olive oil and plant protein from chickpeas.";
        conditionTags = [#CVD, #Diabetes];
        ingredients = ["1 can chickpeas", "1 cup cherry tomatoes", "1 cucumber", "1/4 red onion", "Kalamata olives", "Feta cheese", "Olive oil", "Lemon", "Oregano"];
        instructions = ["Drain and rinse chickpeas", "Halve tomatoes, chop cucumber, slice onion", "Combine all vegetables and chickpeas", "Add olives and feta", "Dress with olive oil, lemon, and oregano", "Toss and serve"];
        prepTime = 15;
        calories = 340;
        protein = 15;
        carbs = 38;
        fat = 15;
        imageUrl = "";
      },
      // Weight Loss recipes
      {
        id = 13;
        name = "Zucchini Noodles with Turkey Bolognese";
        description = "Low-carb pasta alternative with lean turkey sauce. High protein, low calorie for effective weight loss.";
        conditionTags = [#WeightLoss];
        ingredients = ["2 zucchinis", "150g ground turkey", "1 cup crushed tomatoes", "Garlic", "Onion", "Italian herbs", "Olive oil spray", "Parmesan (light)"];
        instructions = ["Spiralize zucchini into noodles", "Saute garlic and onion", "Brown turkey and add tomatoes", "Season with herbs and simmer 15 min", "Lightly saute zucchini noodles 2 min", "Top with turkey sauce", "Sprinkle parmesan"];
        prepTime = 30;
        calories = 290;
        protein = 32;
        carbs = 18;
        fat = 9;
        imageUrl = "";
      },
      {
        id = 14;
        name = "Baked Chicken with Roasted Asparagus";
        description = "High-protein, low-calorie meal. Asparagus is a natural diuretic that supports weight loss.";
        conditionTags = [#WeightLoss];
        ingredients = ["180g chicken breast", "200g asparagus", "Garlic powder", "Paprika", "Lemon", "Olive oil", "Salt", "Black pepper"];
        instructions = ["Preheat oven to 200C", "Season chicken with spices", "Toss asparagus in olive oil and garlic", "Bake chicken 25 min", "Add asparagus last 15 min", "Squeeze lemon over and serve"];
        prepTime = 35;
        calories = 270;
        protein = 40;
        carbs = 8;
        fat = 9;
        imageUrl = "";
      },
      {
        id = 15;
        name = "Vegetable Lentil Soup";
        description = "High-fiber, filling soup that keeps you full for hours. Low calorie and nutrient-dense for weight management.";
        conditionTags = [#WeightLoss, #Diabetes];
        ingredients = ["1 cup green lentils", "2 cups mixed vegetables", "1 can diced tomatoes", "Onion", "Garlic", "Cumin", "Coriander", "Vegetable broth", "Spinach"];
        instructions = ["Saute onion and garlic", "Add spices and toast 1 min", "Add lentils, tomatoes, and broth", "Simmer 25 min", "Add mixed vegetables and cook 10 more min", "Stir in spinach before serving"];
        prepTime = 40;
        calories = 240;
        protein = 16;
        carbs = 40;
        fat = 3;
        imageUrl = "";
      },
      // Weight Gain recipes
      {
        id = 16;
        name = "Peanut Butter Banana Smoothie";
        description = "High-calorie smoothie packed with healthy fats and carbs for clean weight gain.";
        conditionTags = [#WeightGain];
        ingredients = ["2 bananas", "2 tbsp peanut butter", "1 cup whole milk", "1 scoop protein powder", "1 tbsp honey", "1/4 cup oats"];
        instructions = ["Add all ingredients to blender", "Blend until smooth", "Serve immediately"];
        prepTime = 5;
        calories = 520;
        protein = 28;
        carbs = 68;
        fat = 18;
        imageUrl = "";
      },
      {
        id = 17;
        name = "Chicken & Sweet Potato Bowl";
        description = "Calorie-dense bowl with complex carbs and lean protein for healthy muscle gain.";
        conditionTags = [#WeightGain];
        ingredients = ["200g chicken thigh", "1 large sweet potato", "1/2 cup brown rice", "Avocado", "Greek yogurt sauce", "Olive oil", "Spices"];
        instructions = ["Bake sweet potato 45 min at 200C", "Cook brown rice", "Grill seasoned chicken", "Assemble bowl with rice, potato, chicken", "Top with sliced avocado", "Drizzle yogurt sauce"];
        prepTime = 50;
        calories = 620;
        protein = 42;
        carbs = 65;
        fat = 20;
        imageUrl = "";
      },
      {
        id = 18;
        name = "Whole Egg & Cheese Omelette";
        description = "Calorie-rich breakfast with whole eggs and cheese for muscle building and weight gain.";
        conditionTags = [#WeightGain];
        ingredients = ["4 whole eggs", "1/4 cup cheddar cheese", "1/4 cup whole milk", "1 tbsp butter", "Spinach", "Mushrooms", "Salt", "Pepper"];
        instructions = ["Whisk eggs with milk, salt, and pepper", "Melt butter in pan on medium heat", "Saute mushrooms and spinach briefly", "Pour egg mixture over vegetables", "Cook until set on bottom", "Add cheese and fold over", "Serve immediately"];
        prepTime = 15;
        calories = 450;
        protein = 32;
        carbs = 6;
        fat = 34;
        imageUrl = "";
      },
      {
        id = 19;
        name = "Greek Yogurt Parfait with Granola";
        description = "Protein-rich snack with complex carbs from granola. Great for between-meal calorie boost.";
        conditionTags = [#WeightGain, #PCOS];
        ingredients = ["1 cup full-fat Greek yogurt", "1/2 cup granola", "1/2 cup mixed berries", "2 tbsp honey", "1 tbsp chia seeds", "Walnuts"];
        instructions = ["Layer Greek yogurt in glass", "Add granola layer", "Add mixed berries", "Repeat layers", "Drizzle with honey", "Top with chia seeds and walnuts"];
        prepTime = 5;
        calories = 430;
        protein = 22;
        carbs = 55;
        fat = 16;
        imageUrl = "";
      },
      {
        id = 20;
        name = "Tuna & Avocado Rice Bowl";
        description = "Omega-3-rich bowl combining healthy fats from avocado with lean tuna protein.";
        conditionTags = [#WeightGain, #CVD];
        ingredients = ["1 can tuna in olive oil", "1 cup cooked brown rice", "1/2 avocado", "Edamame", "Sesame seeds", "Soy sauce", "Lime juice"];
        instructions = ["Cook brown rice", "Drain tuna", "Slice avocado", "Assemble bowl: rice, tuna, avocado, edamame", "Dress with soy sauce and lime", "Top with sesame seeds"];
        prepTime = 20;
        calories = 490;
        protein = 38;
        carbs = 52;
        fat = 16;
        imageUrl = "";
      },
    ]);

    for (plan in samplePlans.values()) {
      dietPlans.add(plan.id, plan);
    };

    for (recipe in sampleRecipes.values()) {
      recipes.add(recipe.id, recipe);
    };
  };

  // Queries
  public query ({ caller }) func getAllDietPlans() : async [DietPlan] {
    dietPlans.values().toArray();
  };

  public query ({ caller }) func getDietPlanByCondition(condition : DietCondition) : async ?DietPlan {
    var result : ?DietPlan = null;
    for (plan in dietPlans.values()) {
      if (plan.condition == condition) {
        result := ?plan;
      };
    };
    result;
  };

  public query ({ caller }) func getAllRecipes() : async [Recipe] {
    recipes.values().toArray();
  };

  public query ({ caller }) func getRecipesByCondition(condition : DietCondition) : async [Recipe] {
    let filteredRecipes = recipes.filter(
      func(_id, recipe) {
        for (tag in recipe.conditionTags.values()) {
          if (tag == condition) { return true };
        };
        false;
      }
    );
    filteredRecipes.values().toArray();
  };

  public query ({ caller }) func getRecipeById(id : Nat) : async ?Recipe {
    recipes.get(id);
  };

  // Consultancy
  public shared ({ caller }) func submitConsultancyRequest(name : Text, email : Text, condition : Text, message : Text, submittedAt : Text) : async Nat {
    let id = nextConsultancyId;
    let req : ConsultancyRequest = {
      id = id;
      name = name;
      email = email;
      condition = condition;
      message = message;
      submittedAt = submittedAt;
    };
    consultancyRequests.add(id, req);
    nextConsultancyId += 1;
    id;
  };

  public query ({ caller }) func getConsultancyRequests() : async [ConsultancyRequest] {
    consultancyRequests.values().toArray();
  };
};
