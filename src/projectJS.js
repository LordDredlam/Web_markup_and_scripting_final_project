document.getElementById("meal_submit").addEventListener('click',function(event) {
    event.preventDefault();
    var form = document.getElementById("meal_form");
    var formData = new FormData(form);
    var name = formData.get("name");
    var email = formData.get("email");
    var goal_of_the_week = formData.get("goal-of-the-week");
    if (name == "" || email == "" || goal_of_the_week == "") {
        alert("Please fill out all fields.");
    }
    else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
            alert("Please enter a valid email address.");
        }
    else {
        unlock_plan(name,goal_of_the_week);
    }
    
});



/**
 * Unlocks the meal plan form for the user to enter their meals and snacks.
 * @param {string} name The user's name.
 * @param {string} goal_of_the_week The user's goal for the week.
 */
function unlock_plan(name, goal_of_the_week) {
    var meal_plan_parent = document.getElementById("meal_plan_form_parent");
    if (!meal_plan_parent) {
        console.error("Parent element for meal plan form not found.");
        return;
    }

    if (document.getElementById("meal_plan_form") === null) {
        var meal_plan_form = document.createElement("form");
        var meal_plan_header = document.createElement("h2");
        var plan_goal = document.createElement("p");
        var submit_button = document.createElement("input");
        var clear_button = document.createElement("input");
        
        // Set the header and goal text
        meal_plan_header.textContent = "Meal Plan for " + name;
        plan_goal.textContent = goal_of_the_week;
        
        // Set the submit button
        submit_button.type = "submit";
        submit_button.value = "Submit";
        submit_button.id = "plan_submit_button";
        meal_plan_form.id = "meal_plan_form";
        
        // Set the clear button
        clear_button.type = "button";
        clear_button.value = "Clear";
        clear_button.id = "plan_clear_button";

        
        // Create the meal segments for the week
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        for (var i = 0; i < weekdays.length; i++) {
            var day = weekdays[i];
            var day_header = document.createElement("h3");
            day_header.textContent = day;
            var mealSegment = addWeeklyMealSegment();
            if (!mealSegment) {
                console.error("Failed to create meal segment for " + day + ".");
                continue;
            }
            // Set the name of the meal segment to the day of the week
            mealSegment.name = day;
            meal_plan_form.appendChild(day_header);
            meal_plan_form.appendChild(mealSegment);
        }
        
        // Add the form and submit button to the page
        meal_plan_parent.appendChild(meal_plan_header);
        meal_plan_parent.appendChild(plan_goal);
        meal_plan_parent.appendChild(meal_plan_form);
        
        meal_plan_form.appendChild(submit_button);
        submit_button.addEventListener('click', function(event) {
            event.preventDefault();
            planWindow();
        });
        clear_button.addEventListener('click', function(event) {
            event.preventDefault();
            meal_plan_form.reset();
        });
        meal_plan_form.appendChild(clear_button);
    }
}


/**
 * Creates a weekly meal segment consisting of labeled input fields for meals and snacks.
 * @returns {HTMLElement} A div element containing the meal segment.
 */
function addWeeklyMealSegment() {
    const mealSegment = document.createElement('div');
    mealSegment.classList.add('meal-segment');

    const mealTimes = ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner'];
    mealTimes.forEach((meal, index) => {
        const label = document.createElement('label');
        label.setAttribute('for', meal.toLowerCase().replace(' ', '-'));
        label.textContent = meal;

        const input = document.createElement('input');
        input.type = 'text';
        input.name = meal.toLowerCase().replace(' ', '-');

        mealSegment.appendChild(label);
        mealSegment.appendChild(input);
    });

    return mealSegment;
}


function planWindow()
{
    var login_form = document.getElementById("meal_form");
    var loginformData = new FormData(login_form);
    var name = loginformData.get("name");
    var goal_of_the_week = loginformData.get("goal-of-the-week");
    var daily_meals = document.getElementsByClassName("meal-segment");
    const meal_order = ["Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner"];
    myText = ("<html>\n<head>\n<title>" + name + "'s Mealplan</title>\n</head>\n<body>\n");
    myText += ( "<h2> "+ name + "'s mealplan </h2>");
    myText += ("<br></body>\n Plan goal: " + goal_of_the_week + "</body>\n</html>");
    

    for (var i = 0; i < daily_meals.length; i++) {
        var day = daily_meals[i].name;
        var meals = daily_meals[i].getElementsByTagName("input");
        myText += ("<br> <h3>" + day + ":</h3> ");
        for (var j = 0; j < meals.length; j++) {
            var meal = meals[j];
            myText += ("<br>" + meal_order[j] + ": " + meal.value);
            
        }
    }

    flyWindow = window.open('about:blank','myPop','width=800,height=800,left=200,top=200');
    flyWindow.document.write(myText);
}
