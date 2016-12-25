
<?php


function TryC(){
try
            {
                // connect to database
                $handle = new PDO("mysql:dbname=" . "restaurant" . ";host=" . "localhost","root", "");
				// ensure that PDO::prepare returns false when passed invalid SQL
                $handle->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); 
				
				//default value of $query
				$query = "select * from menu where in_stock > ?";
				
				if ($_GET['n'] === 'create'){
				
					Creater();  //Finish this
					
				} else if ($_GET['n'] === 'update'){
					
					Updater($IdStk);  //Finish this, 
					
				} else if ($_GET['n'] === 'delete'){
				
					Deleter();  //Finish this
				    
				}
				
				$stmt = $handle->prepare($query);
				$stmt->execute([0]);
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
				return $rows;
				
                
            }
            catch (Exception $e)
            {
                // trigger (big, orange) error
                trigger_error($e->getMessage(), E_USER_ERROR);
                exit;
            }
			}
			
			
			function Creater(){
			
				//Set default create string value
				    $query = "";
			
			}
			
			
			function Updater($arr){
			
				//Put a loop here! Iterate and update all Values
				for($i = 0, $len = count($arr); $i < $len; $i++){
				
					//Need to Make sure can't go over in_stock!
				    $query = "UPDATE menu SET in_stock=" . $arr[$i] . " WHERE id=" . $arr[$i + 1];
					
				}
			
			}
			
			
			function Deleter($menu_id){
				
				$query = "DELETE FROM menu WHERE id=" . $menu_id ;
			
			}
		
			
			
		?>